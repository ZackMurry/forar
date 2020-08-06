package com.zackmurry.forar.services;

import com.zackmurry.forar.dao.user.UserDao;
import com.zackmurry.forar.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public void addUser(User user) {
        userDao.addUser(user);
    }

    public boolean hasUserWithUsername(String username) {
        return userDao.hasUserWithUsername(username);
    }

}
