import json
import plotly as py
import plotly.graph_objs as go
import sqlite3 as sql

recy = json.loads(open("recyclable.json", "r").read())
garb = json.loads(open("garbage.json", "r").read())
averages = {}


def sort_dict(d):
    sorted_data = sorted(d.items(), key=lambda kv: kv[1], reverse=True)
    sorted_keys = []
    sorted_vals = []
    for thing in sorted_data:
        sorted_keys.append(thing[0])
        sorted_vals.append(thing[1])
    return (sorted_data, sorted_keys, sorted_vals)


def gen_graphs(data, name):
    data_keys = {}
    data_key_occurrences = {}
    for thing in data:
        keys = data[thing]
        for thing1 in keys:
            if thing1[0] not in data_keys:
                data_keys[thing1[0]] = thing1[1]
                data_key_occurrences[thing1[0]] = 1
            else:
                data_keys[thing1[0]] += thing1[1]
                data_key_occurrences[thing1[0]] += 1
    # sorted_data = sorted(
    #     data_keys.items(), key=lambda kv: kv[1], reverse=True)
    # sorted_data_keys = []
    # sorted_data_values = []
    # for thing in sorted_data:
    #     sorted_data_keys.append(thing[0])
    #     sorted_data_values.append(thing[1])
    _, sorted_data_keys, sorted_data_values = sort_dict(
        data_keys)
    final_data = [go.Bar(x=sorted_data_keys, y=sorted_data_values)]
    py.offline.plot(final_data, filename=name +
                    "-graph-additive.html", auto_open=False)

    _, sorted_data_keys, sorted_data_values = sort_dict(
        data_key_occurrences)
    final_data = [go.Bar(x=sorted_data_keys, y=sorted_data_values)]
    py.offline.plot(final_data, filename=name +
                    "-graph-occurrences.html", auto_open=False)

    data_ave = {}
    for thing in data_keys:
        data_ave[thing] = data_keys[thing] / data_key_occurrences[thing]
    _, sorted_data_keys, sorted_data_values = sort_dict(data_ave)
    final_data = [go.Bar(x=sorted_data_keys, y=sorted_data_values)]
    py.offline.plot(final_data, filename=name +
                    "-graph-averages.html", auto_open=False)

    averages[name] = {}
    for k, v in zip(list(range(len(sorted_data_keys))), sorted_data_keys):
        averages[name][v] = sorted_data_values[k]


gen_graphs(recy, "recy")
gen_graphs(garb, "garb")

conn = sql.connect("db.db")
curs = conn.cursor()
curs.execute("""DROP TABLE IF EXISTS averages""")
curs.execute("""
    CREATE TABLE averages (
        type CHARACTER(1),
        classification TEXT,
        value INTEGER
    )
""")
