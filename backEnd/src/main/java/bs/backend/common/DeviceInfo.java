package bs.backend.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceInfo {
    private String did;
    private String name;
    private String type;
    private String location;
    private String status;
    private String uid;

    public DeviceInfo(String did) {
        this.did = did;
    }

    public DeviceInfo(String did, String name) {
        this.did = did;
        this.name = name;
    }

    public DeviceInfo(String did, String name, String type, String location, String status) {
        this.did = did;
        this.name = name;
        this.type = type;
        this.location = location;
        this.status = status;
    }
}
