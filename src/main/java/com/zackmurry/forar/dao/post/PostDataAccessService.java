package com.zackmurry.forar.dao.post;

import com.zackmurry.forar.models.Post;
import org.flywaydb.core.internal.jdbc.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.SQLException;

@Repository
public class PostDataAccessService implements PostDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostDataAccessService(DataSource dataSource) throws SQLException {
        this.jdbcTemplate = new JdbcTemplate(dataSource.getConnection());
    }

    @Override
    public void createPost(Post post) {
        String sql = "INSERT INTO posts (title, body, username) VALUES (?, ?, ?)";
        try {
            jdbcTemplate.execute(
                    sql,
                    post.getTitle(),
                    post.getBody(),
                    post.getUsername()
            );

        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
    }

}
