package bs.backend.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageInfo {
    private String mid;
    private String message;
    private String time;
    private String type;
    private String location;
    private String status;
    private String deviceName;
}
