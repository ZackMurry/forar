package com.zackmurry.forar.controller;

import com.zackmurry.forar.models.User;
import com.zackmurry.forar.services.FollowService;
import com.zackmurry.forar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

//todo get follow count (maybe just return it with the user)
//todo get all following by email

@RestController
@RequestMapping("/api/v1/follows")
public class FollowController {

    @Autowired
    private FollowService followService;

    @Autowired
    private UserService userService;

    @GetMapping("/user/{followerEmail}/follows/{followingEmail}")
    public boolean userFollowsUser(@PathVariable("followerEmail") String followerEmail, @PathVariable("followingEmail") String followingEmail) {
        return followService.userFollowsUser(followerEmail, followingEmail);
    }

    /**
     * used for checking if the authenticated user follows another user
     * @param principal authentication token
     * @param followingEmail email to see if the principal follows
     * @return true for yes, false for no
     */
    @GetMapping("/user/follows/{followingEmail}")
    public boolean authFollowsUser(@AuthenticationPrincipal OidcUser principal, @PathVariable("followingEmail") String followingEmail) {
        String principalEmail = principal.getEmail();
        if(principalEmail.equals("") || followingEmail.equals("")) return false;
        return followService.userFollowsUser(principalEmail, followingEmail);
    }

    /**
     * used for following users
     * @param principal authentication principal
     * @param emailToFollow email of the user that the principal wants to follow
     * @return true for success, false for fail
     */
    @PostMapping("/follow/{followingEmail}")
    public boolean followUser(@AuthenticationPrincipal OidcUser principal, @PathVariable("followingEmail") String emailToFollow) {
        String principalEmail = principal.getEmail();

        //check if both emails have accounts registered to them
        if(!userService.hasUserWithEmail(principalEmail) || !userService.hasUserWithEmail(emailToFollow)) return false;

        //so you can't follow yourself
        if(principalEmail.equals(emailToFollow)) return false;

        //check if the user already follows this person
        if(userFollowsUser(principalEmail, emailToFollow)) return false;

        //if the emailToFollow is null
        if(emailToFollow == null) return false;

        return followService.followUser(principalEmail, emailToFollow);
    }

    //todo will need to make these methods for admins too
    @DeleteMapping("/follow/{followingEmail}")
    public boolean unfollowUser(@AuthenticationPrincipal OidcUser principal, @PathVariable("followingEmail") String emailToUnfollow) {
        String principalEmail = principal.getEmail();
        //if the user doesn't already follow the user, return false
        if(!followService.userFollowsUser(principalEmail, emailToUnfollow)) return false;

        //if the email to follow is invalid, return false
        if(emailToUnfollow == null || emailToUnfollow.equals("")) return false;

        return followService.unfollowUser(principalEmail, emailToUnfollow);
    }

    /**
     * gets followers by a user email. used by frontend to show the user's followers
     *
     * @param email email of the user whose emails you want to get
     * @return a list of users
     */
    @GetMapping("/user/{userEmail}/followers")
    public List<User> getFollowersByUser(@PathVariable("userEmail") String email) {
        List<String> followerEmails = followService.getFollowerEmailsByUser(email);
        if(followerEmails.size() == 0) return new ArrayList<>();
        return userService.getUsersByEmails(followerEmails);
    }





}
