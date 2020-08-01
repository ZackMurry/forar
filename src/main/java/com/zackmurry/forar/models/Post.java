package com.zackmurry.forar.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name="posts")
public class Post {

    @Id
    private UUID id;

    @Column
    private String title;

    @Column
    private String body;

    @Column
    private int votes;

    @Column(name="user_id")
    private String username; //id of the user who posted it

    @Column
    private Timestamp timestamp; //when the post was created


    public Post(UUID id, String title, String body, int votes, String username, Timestamp timestamp) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.votes = votes;
        this.username = username;
        this.timestamp = timestamp;
    }

    //used for creating new posts
    public Post(String title, String body, String username) {
        this.username = username;
        this.title = title;
        this.body = body;
        this.votes = 0; //default vote count
        this.timestamp = new Timestamp(System.currentTimeMillis());
        System.out.println(timestamp);
    }

    public Post(String title, String body) {
        this.username = "testUsername";
        this.title = title;
        this.body = body;
        this.votes = 0; //default vote count
        this.timestamp = new Timestamp(System.currentTimeMillis());
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public int getVotes() {
        return votes;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
