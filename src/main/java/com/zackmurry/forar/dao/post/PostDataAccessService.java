package com.zackmurry.forar.dao.post;

import com.google.gson.Gson;
import com.zackmurry.forar.models.Post;
import org.flywaydb.core.internal.jdbc.JdbcTemplate;
import org.flywaydb.core.internal.jdbc.RowMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.*;

@Service
public class PostDataAccessService implements PostDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostDataAccessService(DataSource dataSource) throws SQLException {
        this.jdbcTemplate = new JdbcTemplate(dataSource.getConnection());
    }

    @Override
    public void createPost(Post post) {
        String sql = "INSERT INTO posts (title, body, username, user_email) VALUES (?, ?, ?, ?)";
        try {
            jdbcTemplate.execute(
                    sql,
                    post.getTitle(),
                    post.getBody(),
                    post.getUsername(),
                    post.getEmail()
            );

        } catch (SQLException sqle) {
            sqle.printStackTrace();
        }
    }

    @Override
    public String getAllPosts() {
        String sql = "SELECT * FROM posts";
        try {

            Gson gson = new Gson();
            JSONObject response = new JSONObject();
            JSONArray jsonArray = new JSONArray();
            List<Map<String, String>> asList = jdbcTemplate.queryForList(sql);

            String jsonPosts = gson.toJson(asList);
            System.out.println(jsonPosts);
            return jsonPosts;
        } catch (SQLException sqle) {
            sqle.printStackTrace();
            return "";
        }
    }

    @Override
    public String getRandomPost() {
        String sql = "SELECT * FROM posts";
        try {

            Gson gson = new Gson();
            JSONObject response = new JSONObject();
            JSONArray jsonArray = new JSONArray();
            List<Map<String, String>> asList = jdbcTemplate.queryForList(sql);

            Random random = new Random();
            String jsonPost = gson.toJson(asList.get(random.nextInt(asList.size())));
            return jsonPost;
        } catch (SQLException sqle) {
            sqle.printStackTrace();
            return "";
        }
    }

    @Override
    public List<Post> getRecentPosts() {
        String sql = "SELECT * FROM posts ORDER BY time_created DESC LIMIT 100";
        try {
            return jdbcTemplate.query(
                    sql,
                    resultSet -> {
                        System.out.println(new Date(resultSet.getTimestamp(7).getTime()));
                        return new Post(
                                resultSet.getInt(1),
                                resultSet.getString(2),
                                resultSet.getString(3),
                                resultSet.getInt(4),
                                resultSet.getString(5),
                                resultSet.getString(6),
                                new Date(resultSet.getTimestamp(7).getTime())
                        );
                    }
            );
        } catch (SQLException sqle) {
            sqle.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public List<Post> getPostsByEmail(String email) {
        String sql = "SELECT * FROM posts WHERE user_email=? ORDER BY time_created DESC";
        try {
            return jdbcTemplate.query(
                    sql,
                    resultSet -> new Post(
                            resultSet.getInt(1),
                            resultSet.getString(2),
                            resultSet.getString(3),
                            resultSet.getInt(4),
                            resultSet.getString(5),
                            resultSet.getString(6),
                            new Date(resultSet.getTimestamp(7).getTime())
                    ),
                    email
            );
        } catch(SQLException sqle) {
            sqle.printStackTrace();
            return new ArrayList<>();
        }
    }

}
