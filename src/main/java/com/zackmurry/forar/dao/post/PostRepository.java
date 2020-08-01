package com.zackmurry.forar.dao.post;

import com.zackmurry.forar.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<User, UUID> {



}
