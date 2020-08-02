package com.zackmurry.forar.dao.post;

import com.zackmurry.forar.models.Post;

import java.util.ArrayList;

public interface PostDao {

    void createPost(Post post);

    String getAllPosts();

    String getRandomPost();

}
