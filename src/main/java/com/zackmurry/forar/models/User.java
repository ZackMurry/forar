package com.zackmurry.forar.models;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    private String username;

    @Column(name="account_role")
    private String role;

    public User(String username, String role) {
        this.username = username;
        this.role = role;
    }

    public User(String username) {
        this.username = username;
        this.role = "USER";
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
}
