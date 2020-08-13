package com.zackmurry.forar.services;

import com.zackmurry.forar.dao.like.LikeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    @Autowired
    private LikeDao likeDao;

    public int userLikesPost(String email, int postId) {
        return likeDao.userLikesPost(email, postId);
    }

    public void likePost(String email, int postId) {
        likeDao.likePost(email, postId);
    }

    public void dislikePost(String email, int postId) {
        likeDao.dislikePost(email, postId);
    }

    public void unlikePost(String email, int postId) {
        likeDao.unlikePost(email, postId);
    }


    public void undislikePost(String email, int postId) {
        likeDao.undislikePost(email, postId);
    }

    public void changeDislikeToLike(String email, int postId) {
        likeDao.changeDislikeToLike(email, postId);
    }

    public void changeLikeToDislike(String email, int postId) {
        likeDao.changeLikeToDislike(email, postId);
    }

    public void deleteByPost(int id) {
        likeDao.deleteByPost(id);
    }
}
