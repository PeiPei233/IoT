package bs.backend.service;

import bs.backend.mapper.DeviceMapper;
import bs.backend.model.Device;
import bs.backend.model.DeviceInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    private final DeviceMapper deviceMapper;

    @Autowired
    public DeviceService(DeviceMapper deviceMapper) {
        this.deviceMapper = deviceMapper;
    }

    public ServiceResult getDeviceList(String uid) {
        return new ServiceResult(true, deviceMapper.getDeviceInfosByUid(Integer.parseInt(uid)));
    }

    public ServiceResult getDeviceBasicList(String uid) {
        return new ServiceResult(true, deviceMapper.getDevicesByUid(Integer.parseInt(uid)));
    }

//    public ServiceResult getDeviceDetail(String did) {
//        return new ServiceResult(true, new DeviceInfo(did, "Device 1", "Light", "Living Room", "On"));
//    }

    public ServiceResult addDevice(Device device) {
        try {
            deviceMapper.insertDevice(device);
            return new ServiceResult(true);
        } catch (Exception e) {
            return new ServiceResult(false);
        }
    }

    public ServiceResult deleteDevice(Device device) {
        try {
            deviceMapper.deleteDeviceByDid(device.getDid());
            return new ServiceResult(true);
        } catch (Exception e) {
            return new ServiceResult(false);
        }
    }

    public ServiceResult updateDevice(Device device) {
        try {
            deviceMapper.updateDevice(device);
            return new ServiceResult(true);
        } catch (Exception e) {
            return new ServiceResult(false);
        }
    }

    public ServiceResult getActiveDeviceCount(String uid) {
        try {
            return new ServiceResult(true, deviceMapper.getActiveDeviceCountByUid(Integer.parseInt(uid)));
        } catch (Exception e) {
            return new ServiceResult(false);
        }
    }

    public ServiceResult getDeviceCount(String uid) {
        try {
            return new ServiceResult(true, deviceMapper.getDeviceCountByUid(Integer.parseInt(uid)));
        } catch (Exception e) {
            return new ServiceResult(false);
        }
    }

}
