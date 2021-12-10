CREATE TABLE categories(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name character varying(30) NOT NULL
);

CREATE TABLE users(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email character varying(100) UNIQUE NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    avatar character varying(100),
    password_hash character varying(255) NOT NULL
);

CREATE TABLE posts(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title character varying(250) NOT NULL,
    date date DEFAULT current_date NOT NULL,
    previewText character varying(250) NOT NULL,
    text character varying(1000) NOT NULL,
    picture character varying(255),
    user_id integer NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    date date DEFAULT current_date NOT NULL,
    text character varying(1000) NOT NULL,
    post_id integer NOT NULL,
    user_id integer NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id),

    CONSTRAINT comments_users FOREIGN KEY (user_id)
        REFERENCES users(id) MATCH FULL
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

CREATE TABLE post_categories(
    post_id integer NOT NULL,
    category_id integer NOT NULL,

    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX ON posts(title);
