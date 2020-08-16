package com.zackmurry.forar.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name="bugs")
public class Bug {

    @Id
    private int id;

    @Column
    private String title;

    @Column
    private String description;

    @Column(name="moment")
    private Timestamp time;

    @Column
    private int count;

    public Bug(int id, String title, String description, Timestamp time, int count) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.time = time;
        this.count = count;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
