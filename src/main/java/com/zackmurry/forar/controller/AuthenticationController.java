package com.zackmurry.forar.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    //todo move auth stuff in here

    @GetMapping("/email")
    public String getUserEmail(@AuthenticationPrincipal OidcUser principal) {
        if(principal == null) return " ";

        return principal.getEmail();
    }

}
