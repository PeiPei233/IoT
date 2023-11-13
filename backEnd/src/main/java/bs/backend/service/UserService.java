package bs.backend.service;

import bs.backend.common.UserInfo;
import org.springframework.stereotype.Service;

@Service   
public class UserService {

    public ServiceResult validate(String username, String password) {
        if (username.equals("admin") && password.equals("admin")) {
            return new ServiceResult(true, "001");
        } else {
            return new ServiceResult(false);
        }
    }

    public ServiceResult register(String username, String password, String email) {
        return new ServiceResult(true);
    }

    public ServiceResult validateUsername(String username) {
        if (username.equals("admin")) {
            return new ServiceResult(true, "001");
        } else {
            return new ServiceResult(false);
        }
    }

    public ServiceResult validateEmail(String email) {
        if (email.equals("admin@admin.com")) {
            return new ServiceResult(true, "001");
        } else {
            return new ServiceResult(false);
        }
    }

    public ServiceResult delete(String uid, String password) {
        if (password.equals("admin")) {
            return new ServiceResult(true);
        } else {
            return new ServiceResult(false, "Wrong password");
        }
    }

    public ServiceResult getUserInfo(String uid) {
        return new ServiceResult(true, new UserInfo("001", "admin", "admin@admin.com"));
    }

    public ServiceResult updateUsername(String uid, String username) {
        return new ServiceResult(true);
    }

    public ServiceResult updatePassword(String uid, String oldPassword, String newPassword) {
        if (oldPassword.equals("admin")) {
            return new ServiceResult(true);
        } else {
            return new ServiceResult(false, "Wrong password");
        }
    }

    public ServiceResult updateEmail(String uid, String email) {
        return new ServiceResult(true);
    }

}
