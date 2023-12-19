package bs.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageInfo {
    private Integer mid;
    private String message;
    private Long timestamp;
    private Integer type;
    private Double lng;
    private Double lat;
    private Integer status;
    private Integer value;
    private String deviceName;
}
