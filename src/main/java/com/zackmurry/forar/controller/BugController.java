package com.zackmurry.forar.controller;

import com.zackmurry.forar.services.BugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/bugs")
public class BugController {

    @Autowired
    private BugService bugService;

    @PostMapping("/404")
    public int report404Error(@RequestBody Map<String, String> map) {
        String url = map.get("url");
        boolean authenticated = map.get("authenticated").equals("true");
        return bugService.report404Error(url, authenticated);
    }

}
