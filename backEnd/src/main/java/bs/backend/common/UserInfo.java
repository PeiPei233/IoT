package bs.backend.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    private String uid;
    private String username;
    private String email;
    private String password;

    public UserInfo(String uid, String username, String email) {
        this.uid = uid;
        this.username = username;
        this.email = email;
    }
}
