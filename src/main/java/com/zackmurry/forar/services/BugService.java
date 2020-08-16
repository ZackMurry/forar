package com.zackmurry.forar.services;

import com.zackmurry.forar.dao.bug.BugDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class BugService {

    @Autowired
    private BugDao bugDao;

    public int report404Error(String url, boolean authenticated) {
        return bugDao.report404Error(url, authenticated);
    }

}
