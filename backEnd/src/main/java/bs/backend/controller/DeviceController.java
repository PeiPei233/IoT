package bs.backend.controller;

import bs.backend.common.DeviceInfo;
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
    public ResponseEntity<List<DeviceInfo>> getDeviceList(HttpSession session) {
        String uid = (String) session.getAttribute("uid");
        ServiceResult result = deviceService.getDeviceList(uid);
        if (result.getSuccess()) {
            Object data = result.getData();
            if (data instanceof List<?> list) {
                if (!list.isEmpty() && list.get(0) instanceof DeviceInfo) {
                    return ResponseEntity.ok((List<DeviceInfo>) list);
                }
            }
            return ResponseEntity.badRequest().body(null);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/basicList")
    public ResponseEntity<List<DeviceInfo>> getDeviceBasicList(HttpSession session) {
        String uid = (String) session.getAttribute("uid");
        ServiceResult result = deviceService.getDeviceBasicList(uid);
        if (result.getSuccess()) {
            Object data = result.getData();
            if (data instanceof List<?> list) {
                if (!list.isEmpty() && list.get(0) instanceof DeviceInfo) {
                    return ResponseEntity.ok((List<DeviceInfo>) list);
                }
            }
            return ResponseEntity.badRequest().body(null);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addDevice(@RequestBody DeviceInfo deviceInfo, HttpSession session) {
        String uid = (String) session.getAttribute("uid");
        deviceInfo.setUid(uid);
        ServiceResult result = deviceService.addDevice(deviceInfo);
        if (result.getSuccess()) {
            return ResponseEntity.ok(deviceInfo.getDid());
        } else {
            return ResponseEntity.ok("fail");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteDevice(@RequestBody DeviceInfo deviceInfo, HttpSession session) {
        String uid = (String) session.getAttribute("uid");
        deviceInfo.setUid(uid);
        ServiceResult result = deviceService.deleteDevice(deviceInfo);
        if (result.getSuccess()) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.ok("fail");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateDevice(@RequestBody DeviceInfo deviceInfo, HttpSession session) {
        String uid = (String) session.getAttribute("uid");
        deviceInfo.setUid(uid);
        ServiceResult result = deviceService.updateDevice(deviceInfo);
        if (result.getSuccess()) {
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
        String uid = (String) session.getAttribute("uid");
        ServiceResult activeResult = deviceService.getActiveDeviceCount(uid);
        ServiceResult totalResult = deviceService.getDeviceCount(uid);
        if (activeResult.getSuccess() && totalResult.getSuccess()) {
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
