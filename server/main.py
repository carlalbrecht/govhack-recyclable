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


@app.route("/")
def index():
    return "Hello World"


@app.route("/api/test", methods=["POST"])
def api_test():
    if "file" not in request.files:
        return "you have to upload a file, man"
    file = request.files["file"]
    if file.filename == "":
        return "you have to upload a file, bro"
    filedata = file.read()
    return jsonify(tf.run_inference_on_image(filedata))
