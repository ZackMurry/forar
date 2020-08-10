package com.zackmurry.forar.controller;

import com.zackmurry.forar.models.Post;
import com.zackmurry.forar.services.PostService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    //todo maybe make method for converting an OIDC User object to the name that will be used


    @Autowired
    private PostService postService;


    @PostMapping("/create")
    public boolean createPost(@RequestBody Map<String, String> map, @AuthenticationPrincipal OidcUser principal) {
        postService.createPost(new Post(map.get("title"), map.get("body"), principal.getGivenName() + " " + principal.getFamilyName(), principal.getEmail()));
        return true;
    }

    @GetMapping("/new")
    public List<Post> getRecentPosts() {
        return postService.getRecentPosts();
    }


}
