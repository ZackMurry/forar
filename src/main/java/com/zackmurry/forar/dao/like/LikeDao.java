package com.zackmurry.forar.dao.like;

import java.util.List;

public interface LikeDao {

    int userLikesPost(String email, int postId);

    void likePost(String email, int postId);

    void unlikePost(String email, int postId);

    void dislikePost(String email, int postId);

    void undislikePost(String email, int postId);

    void changeDislikeToLike(String email, int postId);

    void changeLikeToDislike(String email, int postId);

    void deleteByPost(int id);

    List<Integer> getPostsLikedByUser(String email);

    List<Integer> getPostsDislikedByUser(String email);

}
