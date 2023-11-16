package bs.backend.service;

import bs.backend.common.MessageCount;
import bs.backend.mapper.MessageMapper;
import bs.backend.model.MessageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageMapper messageMapper;

    @Autowired
    public MessageService(MessageMapper messageMapper) {
        this.messageMapper = messageMapper;
    }

    public ServiceResult getMessagesCount(Integer uid) {
        return new ServiceResult(true, new MessageCount(2048, 1024, 512));
    }

    public ServiceResult getMessagesCount(Integer uid, String beginTime, String endTime) {
        return new ServiceResult(true, new MessageCount(1024, 512, 256));
    }

    public ServiceResult getMessages(Integer uid, String beginTime, String endTime) {
        List<MessageInfo> messageInfoList = List.of(
                new MessageInfo("This is a normal message", 1609459200000L, 0, 119.903524, 30.156036, 0, "Device 1"),
                new MessageInfo("This is a warning message", 1609459200000L, 1, 119.903524, 30.156036, 0, "Device 1"),
                new MessageInfo("This is a danger message", 1609459200000L, 2, 119.903524, 30.156036, 0, "Device 1"),
                new MessageInfo("This is a normal message", 1609459200000L, 0, 119.903524, 30.156036, 0, "Device 2"),
                new MessageInfo("This is a warning message", 1609459200000L, 1, 119.903524, 30.156036, 0, "Device 2"),
                new MessageInfo("This is a danger message", 1609459200000L, 2, 119.903524, 30.156036, 0, "Device 2"),
                new MessageInfo("This is a normal message", 1609459200000L, 0, 119.903524, 30.156036, 0, "Device 3"),
                new MessageInfo("This is a warning message", 1609459200000L, 1, 119.903524, 30.156036, 0, "Device 3"),
                new MessageInfo("This is a danger message", 1609459200000L, 2, 119.903524, 30.156036, 0, "Device 3"),
                new MessageInfo("This is a normal message", 1609459200000L, 0, 119.903524, 30.156036, 0, "Device 4"),
                new MessageInfo("This is a warning message", 1609459200000L, 1, 119.903524, 30.156036, 0, "Device 4"),
                new MessageInfo("This is a danger message", 1609459200000L, 2, 119.903524, 30.156036, 0, "Device 4"),
                new MessageInfo("This is a normal message", 1609459200000L, 0, 119.903524, 30.156036, 0, "Device 5"),
                new MessageInfo("This is a warning message", 1609459200000L, 1, 119.903524, 30.156036, 0, "Device 5")
        );
        return new ServiceResult(true, messageInfoList);
    }

    public ServiceResult getMessages(Integer uid, String did, String beginTime, String endTime) {
        List<MessageInfo> messageInfoList = List.of(
                new MessageInfo("This is a normal message", 1609459200000L, 0, 119.903524, 30.156036, 0, "Device " + did),
                new MessageInfo("This is a warning message", 1609459200000L, 1, 119.903524, 30.156036, 0, "Device " + did),
                new MessageInfo("This is a danger message", 1609459200000L, 2, 119.903524, 30.156036, 0, "Device " + did),
                new MessageInfo("This is a normal message", 1609459200000L, 0, 119.903524, 30.156036, 0, "Device " + did),
                new MessageInfo("This is a warning message", 1609459200000L, 1, 119.903524, 30.156036, 0, "Device " + did),
                new MessageInfo("This is a danger message", 1609459200000L, 2, 119.903524, 30.156036, 0, "Device " + did),
                new MessageInfo("This is a normal message", 1609459200000L, 0, 119.903524, 30.156036, 0, "Device " + did),
                new MessageInfo("This is a warning message", 1609459200000L, 1, 119.903524, 30.156036, 0, "Device " + did)
        );
        return new ServiceResult(true, messageInfoList);
    }

    public ServiceResult getDeviceLatestEach(Integer uid) {
        List<MessageInfo> messageInfoList = List.of(
                new MessageInfo("This is a normal message", 1609459200000L, 0, 119.903524, 30.156036, 0, "Device 1"),
                new MessageInfo("This is a warning message", 1609459200000L, 1, 119.903524, 30.156036, 0, "Device 2"),
                new MessageInfo("This is a danger message", 1609459200000L, 2, 119.903524, 30.156036, 0, "Device 3"),
                new MessageInfo("This is a normal message", 1609459200000L, 0, 119.903524, 30.156036, 0, "Device 4"),
                new MessageInfo("This is a warning message", 1609459200000L, 1, 119.903524, 30.156036, 0, "Device 5")
        );
        return new ServiceResult(true, messageInfoList);
    }

    public ServiceResult getMostMessageDevices(Integer uid) {
        List<MessageCount> messageCountList = List.of(
                new MessageCount("Device 1", 1024),
                new MessageCount("Device 2", 512),
                new MessageCount("Device 3", 256),
                new MessageCount("Device 4", 128),
                new MessageCount("Device 5", 64),
                new MessageCount("Device 6", 32),
                new MessageCount("Device 7", 16),
                new MessageCount("Device 8", 8),
                new MessageCount("Device 9", 4),
                new MessageCount("Device 10", 2),
                new MessageCount("Device 11", 1)
        );
        return new ServiceResult(true, messageCountList);
    }

}
