package com.zackmurry.forar.dao.bug;

import com.zackmurry.forar.models.Bug;
import org.flywaydb.core.internal.jdbc.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

@Service
public class BugDataAccessService implements BugDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BugDataAccessService(DataSource dataSource) throws SQLException {
        this.jdbcTemplate = new JdbcTemplate(dataSource.getConnection());
    }

    /**
     * adds a new 404 bug into the database of bugs
     *
     * @param url url that the 404 happened at
     * @param authenticated whether or not the user authenticated at the time
     * @return -1 for error, 0 for unique bug, else returns the number of times this has been reported
     */
    @Override
    public int report404Error(String url, boolean authenticated) {
        String title = "404 error";
        String notes = "URL: " + url + " AUTH: " + authenticated;

        //checking if we've seen this bug before
        String findSimilarBugsSql = "SELECT * FROM bugs WHERE title=? AND notes=?";

        try {
            List<Bug> bugs = jdbcTemplate.query(
                    findSimilarBugsSql,
                    resultSet -> new Bug(
                            resultSet.getInt(1),
                            resultSet.getString(2),
                            resultSet.getString(3),
                            resultSet.getTimestamp(4),
                            resultSet.getInt(5)
                    ),
                    title,
                    notes
            );
            if(bugs.size() > 0) {

                //increasing the number of times this has been reported
                String updateBugCountSql = "UPDATE bugs SET count = count + 1 WHERE title=? AND notes=?";

                jdbcTemplate.execute(
                        updateBugCountSql,
                        title,
                        notes
                );
                return bugs.get(0).getCount(); //returns the amount of times this bug has been reported before this occurence
            }
        } catch(SQLException ignored) {}

        //creating a new bug report
        String newBugSql = "INSERT INTO bugs (title, notes) VALUES (?, ?)";
        try {
            jdbcTemplate.execute(
                    newBugSql,
                    title,
                    notes
            );
            return 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return -1;
        }

    }
}
