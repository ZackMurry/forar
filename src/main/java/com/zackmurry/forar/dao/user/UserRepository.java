package com.zackmurry.forar.dao.user;

import com.zackmurry.forar.models.User;

import java.util.Optional;

public interface UserRepository {

    Optional<User> findUserByName(String name);

}
