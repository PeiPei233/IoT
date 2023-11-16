package bs.backend.model;

import lombok.Data;

@Data
public class Device {
    private Integer did;
    private String name;
    private String type;
    private String location;
    private Integer status;
    private Integer uid;
}
