CREATE TABLE users (
    email VARCHAR(320) NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    points INT DEFAULT 0,
    account_role VARCHAR(100) NOT NULL
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