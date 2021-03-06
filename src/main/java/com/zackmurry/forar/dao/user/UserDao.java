package com.zackmurry.forar.dao.user;

import com.zackmurry.forar.models.Post;
import com.zackmurry.forar.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;

public interface UserDao {

    void addUser(User user);

    boolean hasUserWithUsername(String username);

    boolean hasUserWithEmail(String email);

    User findUserByUsername(String username);

    void incrementPoints(String email);

    void incrementPoints(String email, int amount);

    void decrementPoints(String email);

    void decrementPoints(String email, int amount);

    boolean setBio(String bio, String email);

    User findUserByEmail(String email);

    boolean updateUserSettings(String email, String name, String bio);

    List<User> getUsersByEmails(List<String> emails);

}
