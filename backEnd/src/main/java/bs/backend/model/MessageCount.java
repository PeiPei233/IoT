package bs.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageCount {
    private String deviceName;
    private String time;
    private int normal;
    private int warning;
    private int error;
    private int total;

    public MessageCount(int normal, int warning, int error) {
        this.normal = normal;
        this.warning = warning;
        this.error = error;
        this.total = normal + warning + error;
    }

    public MessageCount(int total) {
        this.total = total;
    }

    public MessageCount(String deviceName, int total) {
        this.deviceName = deviceName;
        this.total = total;
    }
}