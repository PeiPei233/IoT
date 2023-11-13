package bs.backend.service;

import bs.backend.common.DeviceInfo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    public ServiceResult getDeviceList(String uid) {
        List<DeviceInfo> deviceInfoList = List.of(
                new DeviceInfo("001", "Device 1", "Light", "Living Room", "On"),
                new DeviceInfo("002", "Device 2", "Light", "Living Room", "Off"),
                new DeviceInfo("003", "Device 3", "Light", "Living Room", "On"),
                new DeviceInfo("004", "Device 4", "Light", "Living Room", "Off"),
                new DeviceInfo("005", "Device 5", "Light", "Living Room", "On"),
                new DeviceInfo("006", "Device 6", "Light", "Living Room", "Off"),
                new DeviceInfo("007", "Device 7", "Light", "Living Room", "On"),
                new DeviceInfo("008", "Device 8", "Light", "Living Room", "Off"),
                new DeviceInfo("009", "Device 9", "Light", "Living Room", "On"),
                new DeviceInfo("010", "Device 10", "Light", "Living Room", "Off"),
                new DeviceInfo("011", "Device 11", "Light", "Living Room", "On"),
                new DeviceInfo("012", "Device 12", "Light", "Living Room", "Off"),
                new DeviceInfo("013", "Device 13", "Light", "Living Room", "On"),
                new DeviceInfo("014", "Device 14", "Light", "Living Room", "Off"),
                new DeviceInfo("015", "Device 15", "Light", "Living Room", "On"),
                new DeviceInfo("016", "Device 16", "Light", "Living Room", "Off"),
                new DeviceInfo("017", "Device 17", "Light", "Living Room", "On"),
                new DeviceInfo("018", "Device 18", "Light", "Living Room", "Off"),
                new DeviceInfo("019", "Device 19", "Light", "Living Room", "On"),
                new DeviceInfo("020", "Device 20", "Light", "Living Room", "Off"),
                new DeviceInfo("021", "Device 21", "Light", "Living Room", "On"),
                new DeviceInfo("022", "Device 22", "Light", "Living Room", "Off")
        );

        return new ServiceResult(true, deviceInfoList);
    }

    public ServiceResult getDeviceBasicList(String uid) {
        List<DeviceInfo> deviceInfoList = List.of(
                new DeviceInfo("001", "Device 1"),
                new DeviceInfo("002", "Device 2"),
                new DeviceInfo("003", "Device 3"),
                new DeviceInfo("004", "Device 4"),
                new DeviceInfo("005", "Device 5"),
                new DeviceInfo("006", "Device 6"),
                new DeviceInfo("007", "Device 7"),
                new DeviceInfo("008", "Device 8"),
                new DeviceInfo("009", "Device 9"),
                new DeviceInfo("010", "Device 10"),
                new DeviceInfo("011", "Device 11"),
                new DeviceInfo("012", "Device 12"),
                new DeviceInfo("013", "Device 13"),
                new DeviceInfo("014", "Device 14"),
                new DeviceInfo("015", "Device 15"),
                new DeviceInfo("016", "Device 16"),
                new DeviceInfo("017", "Device 17"),
                new DeviceInfo("018", "Device 18"),
                new DeviceInfo("019", "Device 19"),
                new DeviceInfo("020", "Device 20"),
                new DeviceInfo("021", "Device 21"),
                new DeviceInfo("022", "Device 22")
        );

        return new ServiceResult(true, deviceInfoList);
    }

    public ServiceResult getDeviceDetail(String did) {
        return new ServiceResult(true, new DeviceInfo(did, "Device 1", "Light", "Living Room", "On"));
    }

    public ServiceResult addDevice(DeviceInfo deviceInfo) {
        deviceInfo.setDid("100");
        return new ServiceResult(true);
    }

    public ServiceResult deleteDevice(DeviceInfo deviceInfo) {
        return new ServiceResult(true);
    }

    public ServiceResult updateDevice(DeviceInfo deviceInfo) {
        return new ServiceResult(true);
    }

    public ServiceResult getActiveDeviceCount(String uid) {
        return new ServiceResult(true, 699);
    }

    public ServiceResult getDeviceCount(String uid) {
        return new ServiceResult(true, 1024);
    }

}
