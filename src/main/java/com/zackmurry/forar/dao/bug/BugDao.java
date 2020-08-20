package com.zackmurry.forar.dao.bug;

import java.sql.Timestamp;

public interface BugDao {

    int report404Error(String url, boolean authenticated);

    int reportSettingsFormError(String url, boolean authenticated);

}
