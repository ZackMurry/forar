package com.zackmurry.forar.controller;

import com.zackmurry.forar.models.Post;
import com.zackmurry.forar.models.User;
import com.zackmurry.forar.services.PostService;
import com.zackmurry.forar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    //todo maybe do something different for no users and for multiple users
    @GetMapping("/name/{username}")
    public User getUserByName(@PathVariable("username") String username) {
        return userService.findUserByUsername(username);
    }

    @GetMapping("/name/{username}/posts")
    public List<Post> getPostsByName(@PathVariable("username") String username) {
        User user = userService.findUserByUsername(username);
        return postService.getPostsByEmail(user.getEmail());
    }

}
