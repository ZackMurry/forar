package com.zackmurry.forar.controller;

import com.zackmurry.forar.ForarLogger;
import com.zackmurry.forar.models.Post;
import com.zackmurry.forar.services.LikeService;
import com.zackmurry.forar.services.PostService;
import com.zackmurry.forar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    /**
     * only used if the user hasn't liked/disliked the post yet
     * @param principal signed in user
     * @param postId id of the post
     * @return true for likes, else false
     */
    @PostMapping("/post/{id}/like")
    public boolean likePost(@AuthenticationPrincipal OidcUser principal, @PathVariable("id") String postId) {
        String email = principal.getEmail();

        //checking if the user already likes the post. this is handled on the frontend
        //but a user could probably send an http request to get around the frontend block
        if(userLikesPost(principal, postId) != 0) {
            ForarLogger.log("Received an invalid request for likePost. The like value is non-zero.");
            return false;
        }

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

        if(userLikesPost(principal, postId) != 0) {
            ForarLogger.log("Received an invalid request for dislikePost. The like value is non-zero.");
            return false;
        }

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

        if(userLikesPost(principal, postId) != 1) {
            ForarLogger.log("Received an invalid request for unlikePost. The like value is not 1.");
            return false;
        }

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

        if(userLikesPost(principal, postId) != -1) {
            ForarLogger.log("Received an invalid request for undislikePost. The like value is not -1.");
            return false;
        }

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

        if(userLikesPost(principal, postId) != -1) {
            ForarLogger.log("Received an invalid request for changeDislikeToLike. The like value is not -1.");
            return false;
        }

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

        if(userLikesPost(principal, postId) != 1) {
            ForarLogger.log("Received an invalid request for changeLikeToDislike. The like value is not 1.");
            return false;
        }

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

    //todo change this whenever i add ability to have private likes
    //todo have a method for getting both likes and dislikes?
    @GetMapping("/user/{email}/likes")
    public List<Post> getLikedPostsByUserEmail(@PathVariable("email") String email) {
        List<Integer> idList = likeService.getPostsLikedByUser(email); //getting liked post ids;
        return postService.getPostsFromIdList(idList);
    }

    @GetMapping("/user/{email}/dislikes")
    public List<Post> getDislikedPostsByUserEmail(@PathVariable("email") String email) {
        List<Integer> idList = likeService.getPostsDislikedByUser(email);
        return postService.getPostsFromIdList(idList);
    }


}
