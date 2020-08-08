package com.zackmurry.forar.controller;

import com.zackmurry.forar.models.Post;
import com.zackmurry.forar.services.PostService;
import com.zackmurry.forar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

//todo make /login link to the spring security thing. or custom design it.
@Controller
public class ForarController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    //todo move this to api/v1 and return a json object with details for react to load
    @GetMapping("/post/{title}")
    public ModelAndView post(@PathVariable("title") String title) {
        postService.createPost(new Post(title, "I hope this works.", "FirstPoster"));
        ModelAndView model = new ModelAndView("HomePage");
        return model;
    }




}
