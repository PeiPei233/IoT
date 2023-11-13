package bs.backend.service;

public class ServiceResult {
    private boolean success;
    private Object data;

    public ServiceResult(boolean success, Object data) {
        this.success = success;
        this.data = data;
    }

    public ServiceResult(boolean success) {
        this.success = success;
    }

    public boolean getSuccess() {
        return success;
    }

    public Object getData() {
        return data;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
