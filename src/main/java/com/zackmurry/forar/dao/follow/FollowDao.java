package com.zackmurry.forar.dao.follow;

public interface FollowDao {

    boolean userFollowsUser(String followerEmail, String followingEmail);

    boolean followUser(String followerEmail, String emailToFollow);

    boolean unfollowUser(String followerEmail, String emailToUnfollow);

}
