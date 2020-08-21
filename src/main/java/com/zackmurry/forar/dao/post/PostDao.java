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

    List<Post> getPostById(int id);

    void incrementVotes(int id);

    void incrementVotes(int id, int amount);

    void decrementVotes(int id);

    void decrementVotes(int id, int amount);

    String getEmailByPostId(int id);

    void deletePost(int id);

    List<Post> getPostsFromIdList(List<Integer> ids);

    List<Post> getMostRecentPostsByUsers(List<String> userEmails);

}
