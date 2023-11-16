package bs.backend.controller;

import bs.backend.model.Device;
import bs.backend.service.DeviceService;
import bs.backend.service.ServiceResult;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/device")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class DeviceController {

    private final DeviceService deviceService;

    @Autowired
    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Device>> getDeviceList(HttpSession session) {
        Integer uid = (Integer) session.getAttribute("uid");
        ServiceResult result = deviceService.getDeviceList(uid);
        if (result.isSuccess()) {
            Object data = result.getData();
            if (data instanceof List<?> list) {
                if (list.isEmpty() || list.get(0) instanceof Device) {
                    return ResponseEntity.ok((List<Device>) list);
                }
            }
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addDevice(@RequestBody Device device, HttpSession session) {
        Integer uid = (Integer) session.getAttribute("uid");
        device.setUid(uid);
        ServiceResult result = deviceService.addDevice(device);
        if (result.isSuccess()) {
            return ResponseEntity.ok(device.getDid().toString());
        } else {
            return ResponseEntity.ok("fail");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteDevice(@RequestBody Device device, HttpSession session) {
        Integer uid = (Integer) session.getAttribute("uid");
        device.setUid(uid);
        ServiceResult result = deviceService.deleteDevice(device);
        if (result.isSuccess()) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.ok("fail");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateDevice(@RequestBody Device device, HttpSession session) {
        Integer uid = (Integer) session.getAttribute("uid");
        device.setUid(uid);
        ServiceResult result = deviceService.updateDevice(device);
        if (result.isSuccess()) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.ok("fail");
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BriefDeviceInfo {
        private int active;
        private int inactive;
        private int total;
    }

    @GetMapping("/briefInfo")
    public ResponseEntity<BriefDeviceInfo> getBriefDeviceInfo(HttpSession session) {
        Integer uid = (Integer) session.getAttribute("uid");
        ServiceResult activeResult = deviceService.getActiveDeviceCount(uid);
        ServiceResult totalResult = deviceService.getDeviceCount(uid);
        if (activeResult.isSuccess() && totalResult.isSuccess()) {
            Object activeData = activeResult.getData();
            Object totalData = totalResult.getData();
            if (activeData instanceof Integer active && totalData instanceof Integer total) {
                return ResponseEntity.ok(new BriefDeviceInfo(active, total - active, total));
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
