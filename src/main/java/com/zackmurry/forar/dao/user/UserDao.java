package com.zackmurry.forar.dao.user;

import com.zackmurry.forar.models.Post;
import com.zackmurry.forar.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface UserDao {

    void addUser(User user);

}
