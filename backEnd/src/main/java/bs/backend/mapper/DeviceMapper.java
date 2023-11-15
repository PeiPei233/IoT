package bs.backend.mapper;

import bs.backend.model.Device;
import bs.backend.model.DeviceInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DeviceMapper {
    Device getDeviceByDid(Integer did);
    List<Device> getDevicesByUid(Integer uid);
    void insertDevice(Device device);
    void updateDevice(Device device);
    void deleteDeviceByDid(Integer did);
    int getDeviceCountByUid(Integer uid);
    int getActiveDeviceCountByUid(Integer uid);
    List<DeviceInfo> getDeviceInfosByUid(Integer uid);
}
