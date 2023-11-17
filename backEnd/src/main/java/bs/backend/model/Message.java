package bs.backend.model;

import lombok.Data;

@Data
public class Message {
    private Integer mid;
    private Integer type;
    private Integer status;
    private Integer value;
    private String info;
    private Double lng;
    private Double lat;
    private Long timestamp;
    private Integer did;
}
