package com.zackmurry.forar.controller;

import com.zackmurry.forar.ProtoUser;
import com.zackmurry.forar.dao.post.PostRepository;
import com.zackmurry.forar.dao.user.UserRepository;
import com.zackmurry.forar.models.Post;
import com.zackmurry.forar.models.User;
import com.zackmurry.forar.services.PostService;
import com.zackmurry.forar.services.UserService;
import org.ietf.jgss.Oid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class ForarRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;


    @Autowired
    public ForarRestController(ClientRegistrationRepository registrations) {
        this.registration = registrations.findByRegistrationId("okta");
    }

    @GetMapping("/all")
    public String getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/random")
    public String getRandomPost() {
        return postService.getRandomPost();
    }

    @GetMapping("/test")
    public String test(@AuthenticationPrincipal OidcUser user) {
        return "This is a very cool test.";
    }


    @GetMapping("/authenticateUser")
    public boolean authenticateUser(@RequestBody ProtoUser protoUser) { //todo doesn't work. maybe make this an anonymous chat w pseudo names
        System.out.println(protoUser.getUsername() + "; " + protoUser.getPassword());
        return true;
    }

    private ClientRegistration registration;

    @GetMapping("/account/create")
    public String createUser(@AuthenticationPrincipal OidcUser user) {
        System.out.println(user);
        return "test for rn";
    }

    @GetMapping("/loggedIn")
    public String isLoggedIn(@AuthenticationPrincipal OidcUser user) {
        if(user == null)
            return "false";
        return "true";
    }

    @GetMapping("/user")
    public String getUser(@AuthenticationPrincipal OidcUser user) {

        if(user == null) {
            System.out.println("null user");
            return " ";
        }
        String username = user.getGivenName() + " " + user.getFamilyName();
        if(username.contains("_&_")) {
            username = username.replace("_&_", " ");
        }
        System.out.println(username + " logged in.");

        //if we don't have the user in the database, add it
        if(!userService.hasUserWithEmail(user.getEmail())) {
            userService.addUser(new User(user.getEmail(), username));
        }

        return username;
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request,
                                    @AuthenticationPrincipal(expression = "idToken") OidcIdToken idToken) {
        // send logout URL to client so they can initiate logout
        String logoutUrl = this.registration.getProviderDetails()
                .getConfigurationMetadata().get("end_session_endpoint").toString();

        Map<String, String> logoutDetails = new HashMap<>();
        logoutDetails.put("logoutUrl", logoutUrl);
        logoutDetails.put("idToken", idToken.getTokenValue());
        request.getSession(false).invalidate();
        return ResponseEntity.ok().body(logoutDetails);
    }

    @PostMapping("/posts")
    public ResponseEntity<Post> addPost(@Valid @RequestBody Post post, @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
        System.out.println("request to create post with title " + post.getTitle() + " with body " + post.getBody() + ".");
        Map<String, Object> details = principal.getAttributes();
        String userId = details.get("sub").toString();
        System.out.println("UID: " + userId);

        //check to see if user already exists
        Optional<User> user = userRepository.findUserByUsername(userId);
        if(user.isPresent()) {
            System.out.println("user exists");
            post.setUsername(user.get().getUsername());
        }
        else {
            System.out.println("user doesn't exist");
            post.setUsername(userId);
        }

        Post result = postRepository.save(post);
        return ResponseEntity.created(new URI("/api/v1/posts/" + result.getId()))
                .body(result);

    }
    //todo add logging controller for logging from frontend



}
