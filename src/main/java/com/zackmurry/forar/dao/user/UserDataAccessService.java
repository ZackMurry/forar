package com.zackmurry.forar.dao.user;

import com.zackmurry.forar.models.User;
import org.flywaydb.core.internal.jdbc.JdbcTemplate;
import org.flywaydb.core.internal.jdbc.RowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class UserDataAccessService implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDataAccessService(DataSource dataSource) throws SQLException {
        this.jdbcTemplate = new JdbcTemplate(dataSource.getConnection());
    }

    @Override
    public void addUser(User user) {
        String sql = "INSERT INTO users (email, username, account_role) VALUES (?, ?, ?)";

        try {
            jdbcTemplate.execute(
                    sql,
                    user.getEmail(),
                    user.getUsername(),
                    user.getRole()
            );
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
    }

    @Override
    public boolean hasUserWithUsername(String username) {
        String sql = "SELECT EXISTS (SELECT 1 FROM users WHERE username=?)";
        try {
            List<?> l = jdbcTemplate.queryForList(
                    sql,
                    username
            );
            //l.get(0) returns "{exists=[t/f]}", so getting the char at index 8 gets either t or f (for true r false)
            //if it's equal to 't', return true, else return false
            return l.get(0).toString().charAt(8) == 't';
        } catch (SQLException sqle) {
            sqle.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        String sql = "SELECT EXISTS (SELECT 1 FROM users WHERE email=?)";
        try {
            List<?> l = jdbcTemplate.queryForList(
                    sql,
                    email
            );
            //l.get(0) returns "{exists=[t/f]}", so getting the char at index 8 gets either t or f (for true r false)
            //if it's equal to 't', return true, else return false
            return l.get(0).toString().charAt(8) == 't';
        } catch (SQLException sqle) {
            sqle.printStackTrace();
            return false;
        }
    }

    @Override
    public User findUserByUsername(String username) {
        //bodge moments
        String sql = "SELECT * FROM users WHERE username=? ORDER BY points DESC LIMIT 1"; //finds the user with the most points with that name

        try {
            //this will be of length 1 bc of limit
            List<User> users = jdbcTemplate.query(
                    sql,
                    resultSet -> new User(
                            resultSet.getString(1), //email. unless this starts at 0...
                            resultSet.getString(2), //username
                            resultSet.getInt(3), //points
                            resultSet.getString(4), //role
                            resultSet.getString(5) //bio
                    ),
                    username
            );
            return users.get(0);

        } catch (SQLException e) {
            return new User("404", "404");
        }

    }

    @Override
    public void incrementPoints(String email) {
        String sql = "UPDATE users SET points = points + 1 WHERE email=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    email
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void incrementPoints(String email, int amount) {
        String sql = "UPDATE users SET points = points + " + amount + " WHERE email=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    email
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void decrementPoints(String email) {
        String sql = "UPDATE users SET points = points - 1 WHERE email=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    email
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void decrementPoints(String email, int amount) {
        String sql = "UPDATE users SET points = points - " + amount + " WHERE email=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    email
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public boolean setBio(String bio, String email) {
        String sql = "UPDATE users SET bio=? WHERE email=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    bio,
                    email
            );
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public User findUserByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email=? ORDER BY points DESC LIMIT 1";

        try {
            //this will be of length 1 bc of limit
            List<User> users = jdbcTemplate.query(
                    sql,
                    resultSet -> new User(
                            resultSet.getString(1), //email. unless this starts at 0...
                            resultSet.getString(2), //username
                            resultSet.getInt(3), //points
                            resultSet.getString(4), //role
                            resultSet.getString(5) //bio
                    ),
                    email
            );
            return users.get(0);
        } catch (SQLException e) {
            e.printStackTrace();
            return new User("404", "404"); //todo do something better
        }
    }

    @Override
    public boolean updateUserSettings(String email, String name, String bio) {
        String sql = "UPDATE users SET username=?, bio=? WHERE email=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    name,
                    bio,
                    email
            );
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
