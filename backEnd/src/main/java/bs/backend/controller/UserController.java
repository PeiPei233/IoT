package bs.backend.controller;

import bs.backend.model.User;
import bs.backend.service.ServiceResult;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import bs.backend.service.UserService;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    @Data
    public static class LoginRequest {
        private String username;
        private String password;
        private boolean remember;
    }

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        ServiceResult result = userService.validate(loginRequest.getUsername(), loginRequest.getPassword());
        if (result.isSuccess()) {
            session.setAttribute("uid", result.getData());
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.ok("fail");
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        if (session.getAttribute("uid") != null) {
            session.invalidate();
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.badRequest().body("fail");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        ServiceResult result = userService.register(user.getUsername(), user.getPassword(), user.getEmail());
        if (result.isSuccess()) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.ok("fail");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody User user, HttpSession session) {
        if (session.getAttribute("uid") != null) {
            ServiceResult result = userService.delete((Integer) session.getAttribute("uid"), user.getPassword());
            if (result.isSuccess()) {
                session.invalidate();
                return ResponseEntity.ok("success");
            } else {
                return ResponseEntity.ok((String) result.getData());
            }
        } else {
            return ResponseEntity.badRequest().body("fail");
        }
    }

    @GetMapping("/validateUsername")
    public ResponseEntity<String> validateUsername(@RequestParam String username) {
        ServiceResult result = userService.validateUsername(username);
        if (result.isSuccess()) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.ok("fail");
        }
    }

    @GetMapping("/validateEmail")
    public ResponseEntity<String> validateEmail(@RequestParam String email) {
        ServiceResult result = userService.validateEmail(email);
        if (result.isSuccess()) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.ok("fail");
        }
    }

    @GetMapping("/info")
    public ResponseEntity<User> getUserInfo(HttpSession session) {
        if (session.getAttribute("uid") != null) {
            ServiceResult result = userService.getUserInfo((Integer) session.getAttribute("uid"));
            if (result.isSuccess()) {
                return ResponseEntity.ok((User) result.getData());
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/changeUsername")
    public ResponseEntity<String> changeUsername(@RequestBody User user, HttpSession session) {
        if (session.getAttribute("uid") != null) {
            ServiceResult result = userService.updateUsername((Integer) session.getAttribute("uid"), user.getUsername());
            if (result.isSuccess()) {
                return ResponseEntity.ok("success");
            } else {
                return ResponseEntity.ok("fail");
            }
        } else {
            return ResponseEntity.badRequest().body("fail");
        }
    }

    @Data
    public static class ChangePasswordRequest {
        private String oldPassword;
        private String newPassword;
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, HttpSession session) {
        if (session.getAttribute("uid") != null) {
            ServiceResult result = userService.updatePassword((Integer) session.getAttribute("uid"), changePasswordRequest.getOldPassword(), changePasswordRequest.getNewPassword());
            if (result.isSuccess()) {
                return ResponseEntity.ok("success");
            } else {
                return ResponseEntity.ok((String) result.getData());
            }
        } else {
            return ResponseEntity.badRequest().body("fail");
        }
    }

    @PostMapping("/changeEmail")
    public ResponseEntity<String> changeEmail(@RequestBody User user, HttpSession session) {
        if (session.getAttribute("uid") != null && user.getEmail() != null) {
            ServiceResult result = userService.updateEmail((Integer) session.getAttribute("uid"), user.getEmail());
            if (result.isSuccess()) {
                return ResponseEntity.ok("success");
            } else {
                return ResponseEntity.ok("fail");
            }
        } else {
            return ResponseEntity.badRequest().body("fail");
        }
    }

}
