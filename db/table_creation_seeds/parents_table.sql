create table parents (
user_id serial primary key,
username varchar(20),
first_name varchar(20),
last_name varchar(20),
password varchar(250),
email varchar(50),
parent_password varchar(20),
experience_points int,
is_parental boolean
);