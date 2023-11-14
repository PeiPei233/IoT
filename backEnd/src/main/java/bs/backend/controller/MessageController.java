package bs.backend.controller;

import bs.backend.common.MessageCount;
import bs.backend.common.MessageInfo;
import bs.backend.service.MessageService;
import bs.backend.service.ServiceResult;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/message")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/briefInfo")
    public ResponseEntity<MessageCount> getTotalCount(HttpSession session) {
        if (session.getAttribute("uid") == null) {
            return ResponseEntity.badRequest().body(null);
        }
        String uid = (String) session.getAttribute("uid");
        ServiceResult result = messageService.getMessagesCount(uid);
        if (result.getSuccess()) {
            Object data = result.getData();
            if (data instanceof MessageCount messageCount) {
                return ResponseEntity.ok(messageCount);
            }
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/recentCount")
    public ResponseEntity<List<MessageCount>> getRecentCount(HttpSession session) {
        if (session.getAttribute("uid") == null) {
            return ResponseEntity.badRequest().body(null);
        }
        String uid = (String) session.getAttribute("uid");
        List<MessageCount> result = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (int i = 6; i >= 0; i--) {
            ServiceResult serviceResult = messageService.getMessagesCount(uid, today.minusDays(i).toString(), today.minusDays(i).toString());
            if (serviceResult.getSuccess()) {
                Object data = serviceResult.getData();
                if (data instanceof MessageCount messageCount) {
                    messageCount.setTime(today.minusDays(i).toString());
                    result.add(messageCount);
                }
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<MessageInfo>> getLatest(HttpSession session) {
        if (session.getAttribute("uid") == null) {
            return ResponseEntity.badRequest().body(null);
        }
        String uid = (String) session.getAttribute("uid");
        ServiceResult result = messageService.getMessages(uid, null, null);
        if (result.getSuccess()) {
            Object data = result.getData();
            if (data instanceof List<?> list) {
                if (!list.isEmpty() && list.get(0) instanceof MessageInfo) {
                    return ResponseEntity.ok((List<MessageInfo>) list);
                }
            }
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/mostCount")
    public ResponseEntity<List<MessageCount>> getMostCount(HttpSession session) {
        if (session.getAttribute("uid") == null) {
            return ResponseEntity.badRequest().body(null);
        }
        String uid = (String) session.getAttribute("uid");
        ServiceResult result = messageService.getMostMessageDevices(uid);
        if (result.getSuccess()) {
            Object data = result.getData();
            if (data instanceof List<?> list) {
                if (!list.isEmpty() && list.get(0) instanceof MessageCount) {
                    return ResponseEntity.ok((List<MessageCount>) list);
                }
            }
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/latestDevice")
    public ResponseEntity<List<MessageInfo>> getLatestDevice(HttpSession session) {
        if (session.getAttribute("uid") == null) {
            return ResponseEntity.badRequest().body(null);
        }
        String uid = (String) session.getAttribute("uid");
        ServiceResult result = messageService.getDeviceLatestEach(uid);
        if (result.getSuccess()) {
            Object data = result.getData();
            if (data instanceof List<?> list) {
                if (!list.isEmpty() && list.get(0) instanceof MessageInfo) {
                    return ResponseEntity.ok((List<MessageInfo>) list);
                }
            }
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/list")
    public ResponseEntity<List<MessageInfo>> getMessages(@RequestParam String did, @RequestParam String beginTime, @RequestParam String endTime, HttpSession session) {
        if (session.getAttribute("uid") == null) {
            return ResponseEntity.badRequest().body(null);
        }
        String uid = (String) session.getAttribute("uid");
        ServiceResult result = messageService.getMessages(uid, did, beginTime, endTime);
        if (result.getSuccess()) {
            Object data = result.getData();
            if (data instanceof List<?> list) {
                if (!list.isEmpty() && list.get(0) instanceof MessageInfo) {
                    return ResponseEntity.ok((List<MessageInfo>) list);
                }
            }
        }
        return ResponseEntity.badRequest().body(null);
    }


}