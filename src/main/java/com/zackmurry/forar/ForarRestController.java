package com.zackmurry.forar;

import com.zackmurry.forar.services.PostService;
import com.zackmurry.forar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ForarRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @GetMapping("/all")
    public String getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/random")
    public String getRandomPost() {
        return postService.getRandomPost();
    }

    @GetMapping("/test")
    public String test() {
        return "This is a very cool test.";
    }
}
