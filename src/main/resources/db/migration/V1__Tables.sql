CREATE TABLE users (
    email VARCHAR(320) NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    points INT DEFAULT 0,
    account_role VARCHAR(100) NOT NULL,
    bio VARCHAR(250)
);

CREATE TABLE posts (
    id BIGSERIAL NOT NULL,
    title VARCHAR(400) NOT NULL,
    body VARCHAR(5000) NOT NULL,
    votes INT NOT NULL DEFAULT 0,
    username VARCHAR(100) NOT NULL,
    user_email VARCHAR(320) NOT NULL,
    time_created TIMESTAMP DEFAULT current_timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE likes (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    user_email VARCHAR(320) NOT NULL,
    post_id INT NOT NULL,
    is_like BOOLEAN DEFAULT TRUE --true for like, false for dislike
);

CREATE TABLE follows (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    follower_email VARCHAR(320) NOT NULL,
    following_email VARCHAR(320) NOT NULL
);

CREATE TABLE bugs (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    notes VARCHAR(400) DEFAULT '',
    moment TIMESTAMP DEFAULT CURRENT_TIMESTAMP(1),
    count INT DEFAULT 1
);