package bs.backend.mapper;

import bs.backend.model.MessageCount;
import bs.backend.model.Message;
import bs.backend.model.MessageInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MessageMapper {

    void insertMessage(Message message);
    Integer getMessageTypeCount(Integer uid, Integer type);
    Integer getMessageTypeCountByTime(Integer uid, Integer type, Long beginTime, Long endTime);
    List<MessageInfo> getMessages(Integer uid, Long beginTime, Long endTime);
    List<MessageInfo> getMessagesByDid(Integer uid, Integer did, Long beginTime, Long endTime);
    List<MessageInfo> getDeviceLatestEach(Integer uid);
    List<MessageCount> getMostMessageDevices(Integer uid);

}
