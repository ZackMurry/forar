package com.zackmurry.forar.dao.post;

import com.zackmurry.forar.models.Post;

import java.util.ArrayList;
import java.util.List;

public interface PostDao {

    void createPost(Post post);

    String getAllPosts();

    String getRandomPost();

    List<Post> getRecentPosts();

    List<Post> getPostsByEmail(String email);

}
