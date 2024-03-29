import tensorflow as tf
import numpy as np
import re
import os
import json


class NodeLookup(object):
    """Converts integer node ID's to human readable labels."""

    def __init__(self,
                 label_lookup_path=None,
                 uid_lookup_path=None):
        if not label_lookup_path:
            label_lookup_path = 'imagenet.pbtxt'
        if not uid_lookup_path:
            uid_lookup_path = 'imagenet.txt'
        self.node_lookup = self.load(label_lookup_path, uid_lookup_path)

    def load(self, label_lookup_path, uid_lookup_path):
        """Loads a human readable English name for each softmax node.

        Args:
          label_lookup_path: string UID to integer node ID.
          uid_lookup_path: string UID to human-readable string.

        Returns:
          dict from integer node ID to human-readable string.
        """
        if not tf.gfile.Exists(uid_lookup_path):
            tf.logging.fatal('File does not exist %s', uid_lookup_path)
        if not tf.gfile.Exists(label_lookup_path):
            tf.logging.fatal('File does not exist %s', label_lookup_path)

        # Loads mapping from string UID to human-readable string
        proto_as_ascii_lines = tf.gfile.GFile(uid_lookup_path).readlines()
        uid_to_human = {}
        p = re.compile(r'[n\d]*[ \S,]*')
        for line in proto_as_ascii_lines:
            parsed_items = p.findall(line)
            uid = parsed_items[0]
            human_string = parsed_items[2]
            uid_to_human[uid] = human_string

        # Loads mapping from string UID to integer node ID.
        node_id_to_uid = {}
        proto_as_ascii = tf.gfile.GFile(label_lookup_path).readlines()
        for line in proto_as_ascii:
            if line.startswith('  target_class:'):
                target_class = int(line.split(': ')[1])
            if line.startswith('  target_class_string:'):
                target_class_string = line.split(': ')[1]
                node_id_to_uid[target_class] = target_class_string[1:-2]

        # Loads the final mapping of integer node ID to human-readable string
        node_id_to_name = {}
        for key, val in node_id_to_uid.items():
            if val not in uid_to_human:
                tf.logging.fatal('Failed to locate: %s', val)
            name = uid_to_human[val]
            node_id_to_name[key] = name

        return node_id_to_name

    def id_to_string(self, node_id):
        if node_id not in self.node_lookup:
            return ''
        return self.node_lookup[node_id]


def create_graph():
    """Creates a graph from saved GraphDef file and returns a saver."""
    # Creates graph from saved graph_def.pb.
    with tf.gfile.FastGFile("classify_image_graph_def.pb", 'rb') as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())
        _ = tf.import_graph_def(graph_def, name='')


def run_inference_on_image(image_data, preds=5):
    """Runs inference on an image.

    Args:
      image: Image file name.

    Returns:
      Nothing
    """
    # if not tf.gfile.Exists(image):
    #    tf.logging.fatal('File does not exist %s', image)
    #image_data = tf.gfile.FastGFile(image, 'rb').read()

    # Creates graph from saved GraphDef.
    create_graph()

    with tf.Session() as sess:
        # Some useful tensors:
        # 'softmax:0': A tensor containing the normalized prediction across
        #   1000 labels.
        # 'pool_3:0': A tensor containing the next-to-last layer containing 2048
        #   float description of the image.
        # 'DecodeJpeg/contents:0': A tensor containing a string providing JPEG
        #   encoding of the image.
        # Runs the softmax tensor by feeding the image_data as input to the graph.
        softmax_tensor = sess.graph.get_tensor_by_name('softmax:0')
        predictions = sess.run(softmax_tensor,
                               {'DecodeJpeg/contents:0': image_data})
        predictions = np.squeeze(predictions)

        # Creates node ID --> English string lookup.
        node_lookup = NodeLookup()

        retval = []
        top_k = predictions.argsort()[-preds:][::-1]
        for node_id in top_k:
            human_string = node_lookup.id_to_string(node_id)
            score = predictions[node_id]
            #print('%s (score = %.5f)' % (human_string, score))
            retval.append((human_string, float(score)))
        return retval


def run_test_images():
    # Run all images in the "recyclable" folder through tf
    recyclable = {}
    for _, _, files in os.walk("test_images/recyclable"):
        for file in files:
            print("[Recyclable] Testing " + file)
            image_data = tf.gfile.FastGFile(os.path.join(
                "test_images/recyclable/", file), "rb").read()
            tf_data = run_inference_on_image(image_data)
            recyclable[file] = tf_data
    # Run all the images in the "garbage" folder through tf
    garbage = {}
    for _, _, files in os.walk("test_images/garbage"):
        for file in files:
            print("[Garbage] Testing " + file)
            image_data = tf.gfile.FastGFile(os.path.join(
                "test_images/garbage/", file), "rb").read()
            tf_data = run_inference_on_image(image_data)
            garbage[file] = tf_data
    # Dump recyclable data to "recyclable.json"
    file = open("recyclable.json", "w")
    file.write(json.dumps(recyclable))
    file.close()
    # Dump garbage data to "garbage.json"
    file = open("garbage.json", "w")
    file.write(json.dumps(garbage))
    file.close()
