package bs.backend.service;

import bs.backend.model.UserInfo;
import bs.backend.mapper.UserMapper;
import bs.backend.model.User;
import org.apache.ibatis.exceptions.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service   
public class UserService {

    private final UserMapper userMapper;

    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public ServiceResult validate(String username, String password) {
        User user = userMapper.getUserByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return new ServiceResult(true, user.getUid().toString());
        } else {
        return new ServiceResult(false, "Wrong username or password");
        }
    }

    public ServiceResult register(String username, String password, String email) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        try {
            userMapper.insertUser(user);
            return new ServiceResult(true);
        } catch (PersistenceException e) {
            return new ServiceResult(false, "Username or email already exists");
        } catch (Exception e) {
            return new ServiceResult(false, e.getMessage());
        }
    }

    public ServiceResult validateUsername(String username) {
        User user = userMapper.getUserByUsername(username);
        if (user != null) {
            return new ServiceResult(true, user.getUid());
        } else {
            return new ServiceResult(false);
        }
    }

    public ServiceResult validateEmail(String email) {
        User user = userMapper.getUserByEmail(email);
        if (user != null) {
            return new ServiceResult(true, user.getUid());
        } else {
            return new ServiceResult(false);
        }
    }

    public ServiceResult delete(String uid, String password) {
        User user = userMapper.getUserByUid(Integer.parseInt(uid));
        if (user != null && user.getPassword().equals(password)) {
            userMapper.deleteUserByUid(Integer.parseInt(uid));
            return new ServiceResult(true);
        } else {
            return new ServiceResult(false, "Wrong password");
        }
    }

    public ServiceResult getUserInfo(String uid) {
        User user = userMapper.getUserByUid(Integer.parseInt(uid));
        if (user != null) {
            return new ServiceResult(true, new UserInfo(uid, user.getUsername(), user.getEmail()));
        } else {
            return new ServiceResult(false, "User not found");
        }
    }

    public ServiceResult updateUsername(String uid, String username) {
        User user = userMapper.getUserByUid(Integer.parseInt(uid));
        if (user != null) {
            user.setUsername(username);
            userMapper.updateUser(user);
            return new ServiceResult(true);
        } else {
            return new ServiceResult(false, "User not found");
        }
    }

    public ServiceResult updatePassword(String uid, String oldPassword, String newPassword) {
        User user = userMapper.getUserByUid(Integer.parseInt(uid));
        if (user != null && user.getPassword().equals(oldPassword)) {
            user.setPassword(newPassword);
            userMapper.updateUser(user);
            return new ServiceResult(true);
        } else {
            return new ServiceResult(false, "Wrong password");
        }
    }

    public ServiceResult updateEmail(String uid, String email) {
        User user = userMapper.getUserByUid(Integer.parseInt(uid));
        if (user != null) {
            user.setEmail(email);
            userMapper.updateUser(user);
            return new ServiceResult(true);
        } else {
            return new ServiceResult(false, "User not found");
        }
    }

}
