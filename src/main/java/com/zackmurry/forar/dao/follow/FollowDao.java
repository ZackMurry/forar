package com.zackmurry.forar.dao.follow;

import java.util.List;

public interface FollowDao {

    boolean userFollowsUser(String followerEmail, String followingEmail);

    boolean followUser(String followerEmail, String emailToFollow);

    boolean unfollowUser(String followerEmail, String emailToUnfollow);

    List<String> getFollowerEmailsByUser(String email);

    List<String> getFollowingEmailsByUser(String email);

}
