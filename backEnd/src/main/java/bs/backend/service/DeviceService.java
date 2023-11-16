package bs.backend.service;

import bs.backend.mapper.DeviceMapper;
import bs.backend.model.Device;
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

    public ServiceResult getDeviceList(Integer uid) {
        return new ServiceResult(true, deviceMapper.getDevicesByUid(uid));
    }

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

    public ServiceResult getActiveDeviceCount(Integer uid) {
        try {
            return new ServiceResult(true, deviceMapper.getActiveDeviceCountByUid(uid));
        } catch (Exception e) {
            return new ServiceResult(false);
        }
    }

    public ServiceResult getDeviceCount(Integer uid) {
        try {
            return new ServiceResult(true, deviceMapper.getDeviceCountByUid(uid));
        } catch (Exception e) {
            return new ServiceResult(false);
        }
    }

}
