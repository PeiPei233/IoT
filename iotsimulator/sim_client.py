from flask import Flask
import paho.mqtt.client as mqtt
import time
from datetime import datetime
import random
import json
import os

mqtt_broker = os.environ.get('MQTT_BROKER', 'localhost')
mqtt_port = int(os.environ.get('MQTT_PORT', 1883))
mqtt_topic = os.environ.get('MQTT_TOPIC', 'testapp')
port = os.environ.get('PORT', 5000)
mqtt_message_dict = {
    "clientId": "00001",
    "info": "test info",
    "value": 4,
    "alert": 0,
    "lng": 119.9,
    "lat": 30.1,
    "timestamp": 1627616470000
}

app = Flask(__name__)

@app.route('/<string:id>')
def send(id):
    message_dict = mqtt_message_dict.copy()
    message_dict["clientId"] = id
    message_dict["info"] = "Test Info " + datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    message_dict["value"] = random.randint(-2, 100)
    message_dict["alert"] = random.randint(0, 2)
    message_dict["lng"] = random.uniform(119.3, 120.5)
    message_dict["lat"] = random.uniform(29.7, 30.5)
    message_dict["timestamp"] = int(time.time() * 1000)
    message = json.dumps(message_dict)
    try:
        client = mqtt.Client()
        client.connect(mqtt_broker, mqtt_port)
        client.publish(mqtt_topic, message)
        client.disconnect()
        return "Message send success: \n" + message
    except Exception as e:
        return "Message send failed: \n" + str(e)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)