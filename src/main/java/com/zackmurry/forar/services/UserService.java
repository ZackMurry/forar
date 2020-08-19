package com.zackmurry.forar.services;

import com.zackmurry.forar.dao.user.UserDao;
import com.zackmurry.forar.models.Post;
import com.zackmurry.forar.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public boolean hasUserWithEmail(String email) {
        return userDao.hasUserWithEmail(email);
    }

    public User findUserByUsername(String username) {
        return userDao.findUserByUsername(username.replace("_&_", " ")); //replace is for spaces in the url
    }

    public void incrementPoints(String email) {
        userDao.incrementPoints(email);
    }

    public void incrementPoints(String email, int amount) {
        userDao.incrementPoints(email, amount);
    }

    public void decrementPoints(String email) {
        userDao.decrementPoints(email);
    }

    public void decrementPoints(String email, int amount) {
        userDao.decrementPoints(email, amount);
    }

    public boolean setBio(String bio, String email) {
        return userDao.setBio(bio, email);
    }

    public User findUserByEmail(String email) {
        return userDao.findUserByEmail(email);
    }

    public boolean updateUserSettings(String email, String name, String bio) {
        return userDao.updateUserSettings(email, name, bio);
    }

    /**
     * gets a list of users by a list of their emails in a random order
     *
     * @param emails list of emails of users to get
     * @return a list with the users which were requested
     */
    public List<User> getUsersByEmails(List<String> emails) {
        return userDao.getUsersByEmails(emails);
    }
}
