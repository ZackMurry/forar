package com.zackmurry.forar.services;

import com.zackmurry.forar.dao.follow.FollowDao;
import com.zackmurry.forar.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
