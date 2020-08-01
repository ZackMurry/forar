package com.zackmurry.forar.models;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {

    @Id
    private String username;

    @Column
    private String password;

    @Column(name="account_role")
    private String role;

    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.role = "USER";
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
