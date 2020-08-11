package com.zackmurry.forar.controller;

import com.zackmurry.forar.services.LikeService;
import com.zackmurry.forar.services.PostService;
import com.zackmurry.forar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    /**
     *
     * @param principal signed in user
     * @param postId post to check
     * @return 1 for likes, 0 for neither likes nor dislikes, -1 for dislikes
     */
    @GetMapping("/post/{id}")
    public int userLikesPost(@AuthenticationPrincipal OidcUser principal, @PathVariable("id") String postId) {
        //getting email from principal
        String email = principal.getEmail();

        //getting postId as an int
        try {
            int intPostId = Integer.parseInt(postId);
            return likeService.userLikesPost(email, intPostId);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            System.out.println("user typed in a non-integer post id.");
            return 0;
        }
    }

    @PostMapping("/post/{id}/like")
    public boolean likePost(@AuthenticationPrincipal OidcUser principal, @PathVariable("id") String postId) {
        String email = principal.getEmail();


        try {
            int intPostId = Integer.parseInt(postId); //converting string postid to an int
            likeService.likePost(email, intPostId);
            postService.incrementVotes(intPostId);

            String posterEmail = postService.getEmailByPostId(intPostId);
            userService.incrementPoints(posterEmail);

            return true;
        } catch (NumberFormatException e) {
            e.printStackTrace();
            System.out.println("user typed in a non-integer post id.");
            return false;
        }

    }

    @PostMapping("/post/{id}/dislike")
    public boolean dislikePost(@AuthenticationPrincipal OidcUser principal, @PathVariable("id") String postId) {
        String email = principal.getEmail();

        try {
            //converting postId to int
            int intPostId = Integer.parseInt(postId);
            likeService.dislikePost(email, intPostId);
            postService.decrementVotes(intPostId);

            String posterEmail = postService.getEmailByPostId(intPostId);
            userService.decrementPoints(posterEmail);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @DeleteMapping("/post/{id}/like")
    public boolean unlikePost(@AuthenticationPrincipal OidcUser principal, @PathVariable("id") String postId) {
        String email = principal.getEmail();

        //converting postId to int
        try {
            int intPostId = Integer.parseInt(postId);

            //updating the like table
            likeService.unlikePost(email, intPostId);

            //now the post table
            postService.decrementVotes(intPostId);

            //now the user table
            String posterEmail = postService.getEmailByPostId(intPostId);
            userService.decrementPoints(posterEmail);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @DeleteMapping("/post/{id}/dislike")
    public boolean undislikePost(@AuthenticationPrincipal OidcUser principal, @PathVariable("id") String postId) {
        String email = principal.getEmail();

        try {
            int intPostId = Integer.parseInt(postId);
            likeService.undislikePost(email, intPostId);
            postService.incrementVotes(intPostId);

            String posterEmail = postService.getEmailByPostId(intPostId);
            userService.incrementPoints(posterEmail);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    @PutMapping("/post/{id}/like")
    public boolean changeDislikeToLike(@AuthenticationPrincipal OidcUser principal, @PathVariable("id") String postId) {
        String email = principal.getEmail();

        try {
            int intPostId = Integer.parseInt(postId);
            likeService.changeDislikeToLike(email, intPostId);
            postService.incrementVotes(intPostId, 2);

            //setting user points
            String posterEmail = postService.getEmailByPostId(intPostId);
            userService.incrementPoints(posterEmail, 2);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @PutMapping("/post/{id}/dislike")
    public boolean changeLikeToDislike(@AuthenticationPrincipal OidcUser principal, @PathVariable("id") String postId) {
        String email = principal.getEmail();

        try {
            int intPostId = Integer.parseInt(postId);

            //for post
            likeService.changeLikeToDislike(email, intPostId);
            postService.decrementVotes(intPostId, 2);

            //for user
            String posterEmail = postService.getEmailByPostId(intPostId);
            userService.decrementPoints(posterEmail, 2);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
