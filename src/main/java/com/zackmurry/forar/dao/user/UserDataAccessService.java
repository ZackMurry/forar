package com.zackmurry.forar.dao.user;

import com.zackmurry.forar.models.User;
import org.flywaydb.core.internal.jdbc.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.SQLException;

@Repository
public class UserDataAccessService implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDataAccessService(DataSource dataSource) throws SQLException {
        this.jdbcTemplate = new JdbcTemplate(dataSource.getConnection());
    }

    @Override
    public void addUser(User user) {
        String sql = "INSERT INTO users (username, password, account_role) VALUES (?, ?, ?)";

        try {
            jdbcTemplate.execute(
                    sql,
                    user.getUsername(),
                    user.getPassword(),
                    user.getRole()
            );
        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
    }
}
