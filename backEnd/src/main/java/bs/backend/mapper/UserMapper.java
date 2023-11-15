package bs.backend.mapper;

import bs.backend.model.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    User getUserByEmail(String email);
    User getUserByUsername(String username);
    User getUserByUid(Integer uid);
    void insertUser(User user);
    void updateUser(User user);
    void deleteUserByUid(Integer uid);
}
