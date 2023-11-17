package bs.backend.service;

import bs.backend.mapper.UserMapper;
import bs.backend.model.User;
import org.apache.ibatis.exceptions.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service   
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public ServiceResult validate(String username, String password) {
        User user = userMapper.getUserByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return new ServiceResult(true, user.getUid());
        } else {
            return new ServiceResult(false, "Wrong username or password");
        }
    }

    public ServiceResult register(String username, String password, String email) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
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

    public ServiceResult delete(Integer uid, String password) {
        User user = userMapper.getUserByUid(uid);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            try {
                userMapper.deleteUserByUid(uid);
            } catch (Exception e) {
                return new ServiceResult(false, e.getMessage());
            }
            return new ServiceResult(true);
        } else {
            return new ServiceResult(false, "Wrong password");
        }
    }

    public ServiceResult getUserInfo(Integer uid) {
        User user = userMapper.getUserByUid(uid);
        if (user != null) {
            return new ServiceResult(true, new User(uid, user.getUsername(), user.getEmail()));
        } else {
            return new ServiceResult(false, "User not found");
        }
    }

    public ServiceResult updateUsername(Integer uid, String username) {
        User user = userMapper.getUserByUid(uid);
        if (user != null) {
            user.setUsername(username);
            try {
                userMapper.updateUser(user);
            } catch (Exception e) {
                return new ServiceResult(false, e.getMessage());
            }
            return new ServiceResult(true);
        } else {
            return new ServiceResult(false, "User not found");
        }
    }

    public ServiceResult updatePassword(Integer uid, String oldPassword, String newPassword) {
        User user = userMapper.getUserByUid(uid);
        if (user != null && passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            try {
                userMapper.updateUser(user);
            } catch (Exception e) {
                return new ServiceResult(false, e.getMessage());
            }
            return new ServiceResult(true);
        } else {
            return new ServiceResult(false, "Wrong password");
        }
    }

    public ServiceResult updateEmail(Integer uid, String email) {
        User user = userMapper.getUserByUid(uid);
        if (user != null) {
            user.setEmail(email);
            try {
                userMapper.updateUser(user);
            } catch (Exception e) {
                return new ServiceResult(false, e.getMessage());
            }
            return new ServiceResult(true);
        } else {
            return new ServiceResult(false, "User not found");
        }
    }

}
