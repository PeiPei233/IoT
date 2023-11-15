package bs.backend.model;

import lombok.Data;

@Data
public class Message {
    private Integer mid;
    private Integer alert;
    private Integer status;
    private Integer value;
    private String info;
    private Double lat;
    private Double lng;
    private Integer timestamp;
    private Integer uid;
    private Integer did;
}
