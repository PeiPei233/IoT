package bs.backend.service;

import bs.backend.mapper.DeviceMapper;
import bs.backend.mapper.MessageMapper;
import bs.backend.model.IOTMessage;
import bs.backend.model.Message;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MqttSubscriber {

    @Value("${mqtt.broker.url}")
    private String brokerUrl;

    @Value("${mqtt.client.id}")
    private String clientId;

    @Value("${mqtt.topic}")
    private String topic;

    private IMqttClient client;

    private final DeviceMapper deviceMapper;
    private final MessageMapper messageMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public MqttSubscriber(DeviceMapper deviceMapper, MessageMapper messageMapper, ObjectMapper objectMapper) {
        this.deviceMapper = deviceMapper;
        this.messageMapper = messageMapper;
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void init() throws Exception {
        client = new MqttClient(brokerUrl, clientId, new MemoryPersistence());
        MqttConnectOptions options = new MqttConnectOptions();
        options.setCleanSession(true);
        options.setAutomaticReconnect(true);
        options.setConnectionTimeout(10);
        client.connect(options);

        client.subscribe(topic, (topic, msg) -> {
            String payload = new String(msg.getPayload());
            System.out.println("Received: " + payload);
            try {
                IOTMessage iotMessage = objectMapper.readValue(payload, IOTMessage.class);
                Message message = new Message();
                message.setType(iotMessage.getAlert());
                message.setStatus(
                        iotMessage.getValue() >= 0 ? 0 :
                                iotMessage.getValue() == -1 ? 1 : 2
                        );
                message.setValue(iotMessage.getValue());
                message.setInfo(iotMessage.getInfo());
                message.setLng(iotMessage.getLng());
                message.setLat(iotMessage.getLat());
                message.setTimestamp(iotMessage.getTimestamp());
                try {
                    if (iotMessage.getClientId().startsWith("device")) {
                        message.setDid(Integer.parseInt(iotMessage.getClientId().substring(6)));
                    } else {
                        message.setDid(Integer.parseInt(iotMessage.getClientId()));
                    }
                    System.out.println(message);
                    messageMapper.insertMessage(message);
                    deviceMapper.updateDeviceStatusByDid(message.getDid(), message.getType());
                    System.out.println("Message inserted - Device ID: " + iotMessage.getClientId());
                } catch (Exception e) {
                    System.out.println("Insert message failed - Device not found with ID: " + iotMessage.getClientId());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

}
