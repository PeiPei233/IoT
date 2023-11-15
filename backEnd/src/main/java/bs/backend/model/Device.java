package bs.backend.model;

import lombok.Data;

@Data
public class Device {
    private Integer did;
    private String name;
    private String type;
    private String location;
    private Integer uid;

    public Device(DeviceInfo deviceInfo) {
        this.did = Integer.parseInt(deviceInfo.getDid());
        this.name = deviceInfo.getName();
        this.type = deviceInfo.getType();
        this.location = deviceInfo.getLocation();
        this.uid = Integer.parseInt(deviceInfo.getUid());
    }

}
