package com.zackmurry.forar.dao.post;

import com.google.gson.Gson;
import com.zackmurry.forar.models.Post;
import org.flywaydb.core.internal.jdbc.JdbcTemplate;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.*;

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

}
