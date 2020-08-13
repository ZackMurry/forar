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
            //change this logic to happen in the database (ORDER random())
            Gson gson = new Gson();
            List<Map<String, String>> asList = jdbcTemplate.queryForList(sql);

            Random random = new Random();
            return gson.toJson(asList.get(random.nextInt(asList.size())));
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
                    resultSet -> new Post(
                            resultSet.getInt(1),
                            resultSet.getString(2),
                            resultSet.getString(3),
                            resultSet.getInt(4),
                            resultSet.getString(5),
                            resultSet.getString(6),
                            new Date(resultSet.getTimestamp(7).getTime())
                    )
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

    @Override
    public List<Post> getPostById(int id) {
        String sql = "SELECT * FROM posts WHERE id=? LIMIT 1";

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
                    id
            );
        } catch (SQLException sqle) {
            sqle.printStackTrace();
            return new ArrayList<>();
        }

    }

    @Override
    public void incrementVotes(int id) {
        String sql = "UPDATE posts SET votes = votes + 1 WHERE id=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    id
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void incrementVotes(int id, int amount) {
        String sql = "UPDATE posts SET votes = votes + " + amount + " WHERE id=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    id
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void decrementVotes(int id) {
        String sql = "UPDATE posts SET votes = votes - 1 WHERE id=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    id
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void decrementVotes(int id, int amount) {
        String sql = "UPDATE posts SET votes = votes - " + amount + " WHERE id=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    id
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getEmailByPostId(int id) {
        String sql = "SELECT user_email FROM posts WHERE id=? LIMIT 1";

        try {
            List<StringBuilder> list = jdbcTemplate.query(
                    sql,
                    resultSet -> new StringBuilder(
                            resultSet.getString(1)
                    ),
                    id
            );
            //limit 1 means that there will only be one post, so we can just .get(0)
            return list.get(0).toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "null@null.com";
        }
    }

    @Override
    public void deletePost(int id) {
        String sql = "DELETE FROM posts WHERE id=?";

        try {
            jdbcTemplate.execute(
                    sql,
                    id
            );
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public List<Post> getPostsFromIdList(List<Integer> ids) {
        String questionMarks = String.join(",", Collections.nCopies(ids.size(), "?"));

        String sql = String.format("SELECT * FROM posts WHERE id IN (%s)", questionMarks);

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
                    ids.toArray()
            );
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }

    }

}
