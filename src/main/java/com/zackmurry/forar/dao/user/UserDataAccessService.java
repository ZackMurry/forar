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
        String sql = "INSERT INTO users (username, account_role) VALUES (?, ?)";

        try {
            jdbcTemplate.execute(
                    sql,
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
}
