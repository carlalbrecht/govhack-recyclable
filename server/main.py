from flask import Flask, request, jsonify
import sqlite3
import tf

app = Flask(__name__)


def dict_factory(cursor, row):
    """ Produces a dictionary from sqlite results. """
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def db_connection(path):
    """ Opens and closes an sqlite3 connection and passes the cursor as the
        first argument to the decorated function (after self). """
    def db_connection_decorator(f):
        def decorated(self, *args, **kwargs):
            conn = sqlite3.connect(path)
            conn.row_factory = dict_factory
            c = conn.cursor()

            try:
                ret = f(self, c, *args, **kwargs)
            except:
                c.close()
                conn.close()
                raise

            c.close()
            conn.close()
            return ret
        return decorated
    return db_connection_decorator


@db_connection("db.db")
def get_rval_gval(tfdata, c):
    rval, gval = 0, 0
    for classification in tfdata:
        print(classification)
        c.execute("SELECT * FROM averages WHERE classification=?",
                  (classification[0],))
        results = c.fetchall()
        for item in results:
            if item["type"] == "r":
                rval += item["value"]
            elif item["type"] == "g":
                gval += item["value"]
    return (rval, gval)


@app.route("/")
def index():
    return "Hello World"


@app.route("/api/upload", methods=["POST"])
def api_upload():
    # We just assume that a file is uploaded
    file = request.files["file"]
    filedata = file.read()
    tfdata = tf.run_inference_on_image(filedata)
    rval, gval = get_rval_gval(tfdata)
    # This just ensures that if the rval and gval are the same, we return None
    # (null) telling the client that we are unsure of whether or not it is
    # recyclable
    recyclable = None
    if rval != gval:
        recyclable = rval > gval
    return jsonify({"weights": dict(tfdata), "recyclable": recyclable})
