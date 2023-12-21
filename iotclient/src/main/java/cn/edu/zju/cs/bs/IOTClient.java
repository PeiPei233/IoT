package cn.edu.zju.cs.bs;

import java.io.FileInputStream;
import java.util.Properties;
import java.util.Vector;

public class IOTClient {
    public static void main(String[] args) {
        int devices = 1;
        String mqttServer = "tcp://localhost:1883";
        String topic = "testapp";
        String clientPrefix = "";
        int intervalBound = 10;
        int deviceId = -1;

        try {

            String envDevices = System.getenv("DEVICES");
            String envMqttServer = System.getenv("SERVER");
            String envTopic = System.getenv("TOPIC");
            String envClientPrefix = System.getenv("PREFIX");
            String envIntervalBound = System.getenv("INTERVAL_BOUND");
            String envClientId = System.getenv("CLIENT_ID");

            Properties properties = new Properties();
            FileInputStream in = new FileInputStream("iot.properties");
            properties.load(in);
            String propDevices = properties.getProperty("devices");
            String propMqttServer = properties.getProperty("server");
            String propTopic = properties.getProperty("topic");
            String propClientPrefix = properties.getProperty("prefix");
            String propIntervalBound = properties.getProperty("interval_bound");
            String propClientId = properties.getProperty("client_id");

            if (envDevices != null) {
                devices = Integer.parseInt(envDevices);
            } else if (propDevices != null) {
                devices = Integer.parseInt(propDevices);
            }
            if (envMqttServer != null) {
                mqttServer = envMqttServer;
            } else if (propMqttServer != null) {
                mqttServer = propMqttServer;
            }
            if (envTopic != null) {
                topic = envTopic;
            } else if (propTopic != null) {
                topic = propTopic;
            }
            if (envClientPrefix != null) {
                clientPrefix = envClientPrefix;
            } else if (propClientPrefix != null) {
                clientPrefix = propClientPrefix;
            }
            if (envIntervalBound != null) {
                intervalBound = Integer.parseInt(envIntervalBound);
            } else if (propIntervalBound != null) {
                intervalBound = Integer.parseInt(propIntervalBound);
            }
            if (envClientId != null) {
                deviceId = Integer.parseInt(envClientId);
            } else if (propClientId != null) {
                deviceId = Integer.parseInt(propClientId);
            }

            Vector<WorkerThread> threadVector = new Vector<WorkerThread>();
            for (int i = 0; i < devices; i++) {
                WorkerThread thread = new WorkerThread();
                thread.setDeviceId(i + 1);
                thread.setMqttServer(mqttServer);
                thread.setTopic(topic);
                thread.setClientPrefix(clientPrefix);
                thread.setIntervalBound(intervalBound);
                threadVector.add(thread);
                thread.start();
            }
            if (deviceId != -1 && deviceId > devices) {
                WorkerThread thread = new WorkerThread();
                thread.setDeviceId(deviceId);
                thread.setMqttServer(mqttServer);
                thread.setTopic(topic);
                thread.setClientPrefix(clientPrefix);
                thread.setIntervalBound(intervalBound);
                threadVector.add(thread);
                thread.start();
            }
            for (WorkerThread thread : threadVector) {
                thread.join();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
