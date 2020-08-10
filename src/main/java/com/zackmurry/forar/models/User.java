package com.zackmurry.forar.models;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {

    //todo arraylist of posts (SELECT * FROM posts WHERE email=?)

    //avatar color?
    @Id
    private String email;

    @Column
    private String username;

    @Column
    private int points;

    @Column(name="account_role")
    private String role;

    public User(String email, String username, int points, String role) {
        this.email = email;
        this.username = username;
        this.points = points;
        this.role = role;
    }

    public User(String email, String username, String role) {
        this.email = email;
        this.username = username;
        this.role = role;
        this.points = 0;
    }

    public User(String email, String username) {
        this.email = email;
        this.username = username;
        this.role = "USER";
        this.points = 0;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
