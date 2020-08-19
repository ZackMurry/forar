package com.zackmurry.forar.dao.follow;

import org.flywaydb.core.internal.jdbc.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class FollowDataAccessService implements FollowDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FollowDataAccessService(DataSource dataSource) throws SQLException {
        this.jdbcTemplate = new JdbcTemplate(dataSource.getConnection());
    }

    @Override
    public boolean userFollowsUser(String followerEmail, String followingEmail) {
        String sql = "SELECT EXISTS (SELECT 1 FROM follows WHERE follower_email=? AND following_email=?)";

        try {
            List<?> l = jdbcTemplate.queryForList(
                    sql,
                    followerEmail,
                    followingEmail
            );

            //l.get(0) returns "{exists=[t/f]}", so getting the char at index 8 gets either t or f (for true r false)
            //if it's equal to 't', return true, else return false
            return l.get(0).toString().charAt(8) == 't';
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public boolean followUser(String followerEmail, String emailToFollow) {
        String sql = "INSERT INTO follows (follower_email, following_email) VALUES (?, ?)";

        try {
            jdbcTemplate.execute(
                    sql,
                    followerEmail,
                    emailToFollow
            );
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean unfollowUser(String followerEmail, String emailToUnfollow) {
        String sql = "DELETE FROM follows WHERE follower_email=? AND following_email=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    followerEmail,
                    emailToUnfollow
            );
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Queries Postgres for emails of people following the provided email
     *
     * @param email email to find followers of
     * @return list of emails of the user's followers
     */
    @Override
    public List<String> getFollowerEmailsByUser(String email) {
        String sql = "SELECT * FROM follows WHERE following_email=?";

        try {
            return jdbcTemplate.query(
                    sql,
                    resultSet -> resultSet.getString(2),
                    email
            );
        } catch (SQLException sqle) {
            sqle.printStackTrace();
            return new ArrayList<>();
        }

    }
}
