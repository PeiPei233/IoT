package bs.backend.model;

import lombok.Data;

@Data
public class User {
    private Integer uid;
    private String email;
    private String username;
    private String password;
}
