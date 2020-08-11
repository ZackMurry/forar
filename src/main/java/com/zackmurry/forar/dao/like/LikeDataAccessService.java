package com.zackmurry.forar.dao.like;

import org.apache.tomcat.util.http.fileupload.MultipartStream;
import org.flywaydb.core.internal.jdbc.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.List;

@Service
public class LikeDataAccessService implements LikeDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public LikeDataAccessService(DataSource dataSource) throws SQLException {
        this.jdbcTemplate = new JdbcTemplate(dataSource.getConnection());
    }

    @Override
    public int userLikesPost(String email, int postId) {
        String sql = "SELECT is_like FROM likes WHERE user_email=? AND post_id=? LIMIT 1"; //getting the like value from the connection between the post and user

        try{
            List<?> l = jdbcTemplate.queryForList(
                    sql,
                    email, postId
            );

            //if the there are no results, then the user obviously doesn't like the post
            if(l.size() == 0) {
                return 0;
            }

            //l.get(0) returns "{is_like=[t/f]}", so getting the char at index 9 gets either t or f (for true r false)
            //if it's equal to 't', return 1, else return -1
            return l.get(0).toString().charAt(9) == 't' ? 1 : -1;

        } catch (SQLException sqle) {
            sqle.printStackTrace();
            return 0;
        }

    }

    @Override
    public void likePost(String email, int postId) {
        String sql = "INSERT INTO likes (user_email, post_id, is_like) VALUES (?, ?, true)"; //true is redundant but it's clearer

        try {
            jdbcTemplate.execute(
                    sql,
                    email,
                    postId
            );
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public void dislikePost(String email, int postId) {
        String sql = "INSERT INTO likes (user_email, post_id, is_like) VALUES (?, ?, false)";

        try {
            jdbcTemplate.execute(
                    sql,
                    email,
                    postId
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void unlikePost(String email, int postId) {
        String sql = "DELETE FROM likes * WHERE user_email=? AND post_id=? AND is_like='t'";

        try {
            jdbcTemplate.execute(
                    sql,
                    email,
                    postId
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void undislikePost(String email, int postId) {
        String sql = "DELETE FROM likes * WHERE user_email=? AND post_id=? AND is_like='f'";

        try {
            jdbcTemplate.execute(
                    sql,
                    email,
                    postId
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void changeDislikeToLike(String email, int postId) {
        String sql = "UPDATE likes SET is_like='t' WHERE user_email=? AND post_id=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    email,
                    postId
            );
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public void changeLikeToDislike(String email, int postId) {
        String sql = "UPDATE likes SET is_like='f' WHERE user_email=? AND post_id=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    email,
                    postId
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
