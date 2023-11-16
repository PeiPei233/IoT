package bs.backend.service;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ServiceResult {
    private boolean success;
    private Object data;

    public ServiceResult(boolean success) {
        this.success = success;
    }
}
