package com.zackmurry.forar.controller;

import com.zackmurry.forar.models.Post;
import com.zackmurry.forar.models.User;
import com.zackmurry.forar.services.PostService;
import com.zackmurry.forar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

//todo bios and profile colors/pics

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

    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable("email") String email) {
        return userService.findUserByEmail(email);
    }

    @GetMapping("/name/{username}/posts")
    public List<Post> getPostsByName(@PathVariable("username") String username) {
        User user = userService.findUserByUsername(username);
        return postService.getPostsByEmail(user.getEmail());
    }

    //todo add method for admin
    @PostMapping("/bio")
    public boolean setUserBio(@RequestBody Map<String, String> map, @AuthenticationPrincipal OidcUser principal) {
        String newBio = map.get("bio");
        String email = principal.getEmail();
        return userService.setBio(newBio, email);
    }

    @GetMapping("/current")
    public User getCurrentUser(@AuthenticationPrincipal OidcUser principal) {
        return userService.findUserByEmail(principal.getEmail());
    }

    @RequestMapping(value = "/current/settings", method = RequestMethod.OPTIONS)
    public boolean updateUserSettings(@AuthenticationPrincipal OidcUser principal, @RequestBody Map<String, String> map) {
        System.out.println("submit");
        System.out.println("map = " + map);
        String email = principal.getEmail();
        String name = map.get("username");
        String bio = map.get("bio");
        return userService.updateUserSettings(email, name, bio);
    }

}
