package com.zackmurry.forar.dao.post;

import com.zackmurry.forar.models.Post;
import com.zackmurry.forar.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    Collection<Post> findAllByUsername(String name);

    Collection<Post> findAllByEmail(String email);

}
