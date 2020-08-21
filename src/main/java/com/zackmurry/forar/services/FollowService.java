package com.zackmurry.forar.services;

import com.zackmurry.forar.dao.follow.FollowDao;
import com.zackmurry.forar.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FollowService {

    @Autowired
    private FollowDao followDao;

    public boolean userFollowsUser(String followerEmail, String followingEmail) {
        return followDao.userFollowsUser(followerEmail, followingEmail);
    }

    public boolean followUser(String followerEmail, String emailToFollow) {
        return followDao.followUser(followerEmail, emailToFollow);
    }

    public boolean unfollowUser(String followerEmail, String emailToUnfollow) {
        return followDao.unfollowUser(followerEmail, emailToUnfollow);
    }

    public List<String> getFollowerEmailsByUser(String email) {
        return followDao.getFollowerEmailsByUser(email);
    }

    /**
     * gets a list of emails which user is following
     *
     * @param email email of user to query for
     * @return a list of emails that the user is following
     */
    public List<String> getFollowingEmailsByUser(String email) {
        //todo implement
        return followDao.getFollowingEmailsByUser(email);
    }
}
