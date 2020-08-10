package com.zackmurry.forar.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import static com.google.common.base.Preconditions.checkArgument;

@Entity
@Table(name="posts")
public class Post {

    @Id
    private int id;

    @Column
    private String title;

    @Column
    private String body;

    @Column
    private int votes;

    @Column(name="user_id")
    private String username; //id of the user who posted it

    @Column(name="user_email")
    private String email;

    @Column
    private Date time; //when the post was created

    private String simpleTime;

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("EEEEE MMMMM d");
    private static final SimpleDateFormat timeFormat = new SimpleDateFormat("h:mm a");

    public Post(int id, String title, String body, int votes, String username, String email, Date date, String simpleTime) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.votes = votes;
        this.username = username;
        this.email = email;
        this.time = date;
        this.simpleTime = simpleTime;
    }

    public Post(int id, String title, String body, int votes, String username, String email, Date date) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.votes = votes;
        this.username = username;
        this.email = email;
        this.time = date;
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("CST"));
        cal.setTime(this.time);
        this.simpleTime = dateFormat.format(this.time) + getDayOfMonthSuffix(cal.get(Calendar.DAY_OF_MONTH)) + " at " + timeFormat.format(this.time);
    }

    //used for creating new posts
    public Post(String title, String body, String username, String email) {
        this.username = username;
        this.email = email;
        this.title = title;
        this.body = body;
        this.votes = 0; //default vote count
        this.time = new Date(new Timestamp(System.currentTimeMillis()).getTime());
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("CST"));
        cal.setTime(this.time);
        this.simpleTime = dateFormat.format(this.time) + getDayOfMonthSuffix(cal.get(Calendar.DAY_OF_MONTH)) + " at " + timeFormat.format(this.time);
    }

    public Post(String title, String body) {
        this.username = "testUsername";
        this.email = "test.post@forar.io";
        this.title = title;
        this.body = body;
        this.votes = 0; //default vote count
        this.time = new Date(new Timestamp(System.currentTimeMillis()).getTime());
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("CST"));
        cal.setTime(this.time);
        this.simpleTime = dateFormat.format(this.time) + getDayOfMonthSuffix(cal.get(Calendar.DAY_OF_MONTH)) + " at " + timeFormat.format(this.time);
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

    public Date getTime() {
        return time;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSimpleTime() {
        return simpleTime;
    }

    public void setSimpleTime(String simpleTime) {
        this.simpleTime = simpleTime;
    }


    private static String getDayOfMonthSuffix(int dayOfMonth) {
        checkArgument(dayOfMonth >= 1 && dayOfMonth <= 31, "illegal day of month: " + dayOfMonth);
        if (dayOfMonth >= 11 && dayOfMonth <= 13) {
            return "th";
        }
        switch (dayOfMonth % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

}
