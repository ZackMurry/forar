package com.zackmurry.forar.services;

import com.zackmurry.forar.dao.post.PostDao;
import com.zackmurry.forar.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostDao postDao;

    public void createPost(Post post) {
        postDao.createPost(post);
    }

    public String getAllPosts() {
        return postDao.getAllPosts();
    }

    public String getRandomPost() {
        return postDao.getRandomPost();
    }

    public List<Post> getRecentPosts() {
        return postDao.getRecentPosts();
    }

    public List<Post> getPostsByEmail(String email) {
        return postDao.getPostsByEmail(email);
    }

    public List<Post> getPostById(int id) {
        return postDao.getPostById(id);
    }

    public void incrementVotes(int id) {
        postDao.incrementVotes(id);
    }

    public void incrementVotes(int id, int amount) {
        postDao.incrementVotes(id);
    }

    public void decrementVotes(int id) {
        postDao.decrementVotes(id);
    }

    public void decrementVotes(int id, int amount) {
        postDao.decrementVotes(id);
    }

    public String getEmailByPostId(int id) {
        return postDao.getEmailByPostId(id);
    }

    public void deletePost(int id) {
        postDao.deletePost(id);
    }
}
