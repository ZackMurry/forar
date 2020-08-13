package com.zackmurry.forar.controller;

import com.zackmurry.forar.models.Post;
import com.zackmurry.forar.services.LikeService;
import com.zackmurry.forar.services.PostService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private LikeService likeService;

    private static final int MAX_TITLE_LENGTH = 400;
    private static final int MAX_BODY_LENGTH = 5000;


    @PostMapping("/create")
    public boolean createPost(@RequestBody Map<String, String> map, @AuthenticationPrincipal OidcUser principal) {
        if(map.get("title").length() > MAX_TITLE_LENGTH || map.get("body").length() > MAX_BODY_LENGTH) return false;
        postService.createPost(new Post(map.get("title"), map.get("body"), principal.getGivenName() + " " + principal.getFamilyName(), principal.getEmail()));
        return true;
    }

    @GetMapping("/new")
    public List<Post> getRecentPosts() {
        return postService.getRecentPosts();
    }

    //using a list of posts even though im just returning one. it's so that i can return an empty list
    @GetMapping("/id/{id}")
    public List<Post> getPostById(@PathVariable("id") String id) {

        try {
            int intId = Integer.parseInt(id);

            //finding post from the id
            return postService.getPostById(intId);

        } catch (NumberFormatException e) {
            System.out.println("A user requested an invalid post id."); //temp
            return new ArrayList<>();
        }

    }

    @DeleteMapping("/id/{id}")
    public boolean deletePostById(@PathVariable("id") String id, @AuthenticationPrincipal OidcUser principal) {
        try {
            int intId = Integer.parseInt(id);

            //checking if the user actually made the post
            //todo allow admins to delete posts too
            if(!principal.getEmail().equals(postService.getEmailByPostId(intId))) {
                return false;
            }

            postService.deletePost(intId);
            likeService.deleteByPost(intId); //deleting the likes associated with the post

            return true;
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return false;
        }

    }


}
