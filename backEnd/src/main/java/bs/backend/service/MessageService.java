package bs.backend.service;

import bs.backend.model.MessageCount;
import bs.backend.mapper.MessageMapper;
import bs.backend.model.MessageInfo;
import bs.backend.utils.time.TimestampRange;
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
        try {
            Integer normalCount = messageMapper.getMessageTypeCount(uid, 0);
            Integer warningCount = messageMapper.getMessageTypeCount(uid, 1);
            Integer dangerCount = messageMapper.getMessageTypeCount(uid, 2);
            return new ServiceResult(true, new MessageCount(normalCount, warningCount, dangerCount));
        } catch (Exception e) {
            return new ServiceResult(false, e.getMessage());
        }
    }

    public ServiceResult getMessagesCount(Integer uid, String beginTime, String endTime) {
        try {
            TimestampRange timestampRange = new TimestampRange(beginTime, endTime);
            Integer normalCount = messageMapper.getMessageTypeCountByTime(uid, 0, timestampRange.getBeginTimestamp(), timestampRange.getEndTimestamp());
            Integer warningCount = messageMapper.getMessageTypeCountByTime(uid, 1, timestampRange.getBeginTimestamp(), timestampRange.getEndTimestamp());
            Integer dangerCount = messageMapper.getMessageTypeCountByTime(uid, 2, timestampRange.getBeginTimestamp(), timestampRange.getEndTimestamp());
            return new ServiceResult(true, new MessageCount(normalCount, warningCount, dangerCount));
        } catch (Exception e) {
            e.printStackTrace();
            return new ServiceResult(false, e.getMessage());
        }
    }

    public ServiceResult getMessages(Integer uid, String beginTime, String endTime) {
        try {
            TimestampRange timestampRange = new TimestampRange(beginTime, endTime);
            List<MessageInfo> messageInfoList = messageMapper.getMessages(uid, timestampRange.getBeginTimestamp(), timestampRange.getEndTimestamp());
            return new ServiceResult(true, messageInfoList);
        } catch (Exception e) {
            return new ServiceResult(false, e.getMessage());
        }
    }

    public ServiceResult getMessages(Integer uid, Integer did, String beginTime, String endTime) {
        try {
            TimestampRange timestampRange = new TimestampRange(beginTime, endTime);
            List<MessageInfo> messageInfoList = messageMapper.getMessagesByDid(uid, did, timestampRange.getBeginTimestamp(), timestampRange.getEndTimestamp());
            return new ServiceResult(true, messageInfoList);
        } catch (Exception e) {
            return new ServiceResult(false, e.getMessage());
        }
    }

    public ServiceResult getDeviceLatestEach(Integer uid) {
        try {
            List<MessageInfo> messageInfoList = messageMapper.getDeviceLatestEach(uid);
            return new ServiceResult(true, messageInfoList);
        } catch (Exception e) {
            return new ServiceResult(false, e.getMessage());
        }
    }

    public ServiceResult getMostMessageDevices(Integer uid) {
        try {
            List<MessageCount> messageCountList = messageMapper.getMostMessageDevices(uid);
            return new ServiceResult(true, messageCountList);
        } catch (Exception e) {
            return new ServiceResult(false, e.getMessage());
        }
    }

}
