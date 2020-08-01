package com.zackmurry.forar.services;

import com.zackmurry.forar.dao.post.PostDao;
import com.zackmurry.forar.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private PostDao postDao;

    public void createPost(Post post) {
        postDao.createPost(post);
    }


}
