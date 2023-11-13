package bs.backend.service;

import bs.backend.common.MessageCount;
import bs.backend.common.MessageInfo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    public ServiceResult getMessagesCount(String uid) {
        return new ServiceResult(true, new MessageCount(2048, 1024, 512));
    }

    public ServiceResult getMessagesCount(String uid, String beginTime, String endTime) {
        return new ServiceResult(true, new MessageCount(1024, 512, 256));
    }

    public ServiceResult getMessages(String uid, String beginTime, String endTime) {
        List<MessageInfo> messageInfoList = List.of(
                new MessageInfo("001", "This is a normal message", "2021-01-01 00:00:00", "normal", "Beijing", "unread", "Device 1"),
                new MessageInfo("002", "This is a warning message", "2021-01-01 00:00:00", "warning", "Beijing", "unread", "Device 1"),
                new MessageInfo("003", "This is an error message", "2021-01-01 00:00:00", "error", "Beijing", "unread", "Device 1"),
                new MessageInfo("004", "This is a normal message", "2021-01-01 00:00:00", "normal", "Beijing", "unread", "Device 1"),
                new MessageInfo("005", "This is a warning message", "2021-01-01 00:00:00", "warning", "Beijing", "unread", "Device 1"),
                new MessageInfo("006", "This is an error message", "2021-01-01 00:00:00", "error", "Beijing", "unread", "Device 1"),
                new MessageInfo("007", "This is a normal message", "2021-01-01 00:00:00", "normal", "Beijing", "unread", "Device 1")
        );
        return new ServiceResult(true, messageInfoList);
    }

    public ServiceResult getMessages(String uid, String did, String beginTime, String endTime) {
        List<MessageInfo> messageInfoList = List.of(
                new MessageInfo("001", "This is a normal message", "2021-01-01 00:00:00", "normal", "119.150,30.160", "unread", "Device " + did),
                new MessageInfo("002", "This is a warning message", "2021-01-01 00:05:00", "warning", "119.250,30.170", "unread", "Device " + did),
                new MessageInfo("003", "This is an error message", "2021-01-01 00:10:00", "error", "119.255,30.180", "unread", "Device " + did),
                new MessageInfo("004", "This is a normal message", "2021-01-01 00:15:00", "normal", "119.266,30.120", "unread", "Device " + did),
                new MessageInfo("005", "This is a warning message", "2021-01-01 00:20:00", "warning", "119.277,30.130", "unread", "Device " + did),
                new MessageInfo("006", "This is an error message", "2021-01-01 00:25:00", "error", "119.262,30.140", "unread", "Device " + did),
                new MessageInfo("007", "This is a normal message", "2021-01-01 00:30:00", "normal", "119.253,30.150", "unread", "Device " + did)
        );
        return new ServiceResult(true, messageInfoList);
    }

    public ServiceResult getDeviceLatestEach(String uid) {
        List<MessageInfo> messageInfoList = List.of(
                new MessageInfo("001", "This is a normal message", "2021-01-01 00:00:00", "normal", "116.482086,39.990496", "unread", "Device 1"),
                new MessageInfo("002", "This is a warning message", "2021-01-01 00:00:00", "warning", "116.482046,39.990496", "unread", "Device 2"),
                new MessageInfo("003", "This is an error message", "2021-01-01 00:00:00", "error", "116.482086,39.990596", "unread", "Device 3"),
                new MessageInfo("004", "This is a normal message", "2021-01-01 00:00:00", "normal", "116.482086,39.990946", "unread", "Device 4"),
                new MessageInfo("005", "This is a warning message", "2021-01-01 00:00:00", "warning", "116.482686,39.990496", "unread", "Device 5"),
                new MessageInfo("006", "This is an error message", "2021-01-01 00:00:00", "error", "116.482586,39.990596", "unread", "Device 6"),
                new MessageInfo("007", "This is a normal message", "2021-01-01 00:00:00", "normal", "116.482046,39.990396", "unread", "Device 7"),
                new MessageInfo("008", "This is a warning message", "2021-01-01 00:00:00", "warning", "116.481086,39.990436", "unread", "Device 8"),
                new MessageInfo("009", "This is an error message", "2021-01-01 00:00:00", "error", "116.482286,39.992496", "unread", "Device 9"),
                new MessageInfo("010", "This is a normal message", "2021-01-01 00:00:00", "normal", "116.482806,39.990946", "unread", "Device 10"),
                new MessageInfo("011", "This is a warning message", "2021-01-01 00:00:00", "warning", "116.482056,39.997496", "unread", "Device 11")
        );
        return new ServiceResult(true, messageInfoList);
    }

    public ServiceResult getMostMessageDevices(String uid) {
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
