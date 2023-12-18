CREATE USER 'A'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'A'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

create database if not exists iot;

use iot;

CREATE TABLE SPRING_SESSION (
    PRIMARY_ID CHAR(36) NOT NULL,
    SESSION_ID CHAR(36) NOT NULL,
    CREATION_TIME BIGINT NOT NULL,
    LAST_ACCESS_TIME BIGINT NOT NULL,
    MAX_INACTIVE_INTERVAL INT NOT NULL,
    EXPIRY_TIME BIGINT NOT NULL,
    PRINCIPAL_NAME VARCHAR(100),
    CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_ID)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;

CREATE UNIQUE INDEX SPRING_SESSION_IX1 ON SPRING_SESSION (SESSION_ID);
CREATE INDEX SPRING_SESSION_IX2 ON SPRING_SESSION (EXPIRY_TIME);
CREATE INDEX SPRING_SESSION_IX3 ON SPRING_SESSION (PRINCIPAL_NAME);

CREATE TABLE SPRING_SESSION_ATTRIBUTES (
   SESSION_PRIMARY_ID CHAR(36) NOT NULL,
   ATTRIBUTE_NAME VARCHAR(200) NOT NULL,
   ATTRIBUTE_BYTES BLOB NOT NULL,
   CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME),
   CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION(PRIMARY_ID) ON DELETE CASCADE
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;

create table if not exists user
(
    uid      int auto_increment
        primary key,
    email    varchar(255) not null,
    username varchar(255) not null,
    password varchar(255) not null,
    constraint user_pk2
        unique (username),
    constraint user_pk3
        unique (email)
);

create table if not exists device
(
    did      int auto_increment
        primary key,
    name     varchar(255)  not null,
    type     varchar(255)  null,
    location varchar(255)  null,
    status   int default 0 not null,
    uid      int           not null,
    constraint device_user_uid_fk
        foreign key (uid) references user (uid)
            on update cascade on delete cascade
);

create table if not exists message
(
    mid       int auto_increment
        primary key,
    type      int default 0 null,
    status    int default 0 not null,
    value     int           null,
    info      varchar(255)  null,
    lng       double        null,
    lat       double        null,
    timestamp mediumtext    not null,
    did       int           not null,
    constraint message_device_did_fk
        foreign key (did) references device (did)
            on update cascade on delete cascade
);

