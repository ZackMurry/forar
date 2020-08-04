package com.zackmurry.forar;

import com.zackmurry.forar.services.PostService;
import com.zackmurry.forar.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping("/authenticateUser")
    public boolean authenticateUser(@RequestBody ProtoUser protoUser) { //todo doesn't work. maybe make this an anonymous chat w pseudo names
        System.out.println(protoUser.getUsername() + "; " + protoUser.getPassword());
        return true;
    }

}
