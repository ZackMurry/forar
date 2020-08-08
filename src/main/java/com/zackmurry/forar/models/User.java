package com.zackmurry.forar.models;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {

    //todo use email address as unique field bc that's what okta already does and some people probably have the same names
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
