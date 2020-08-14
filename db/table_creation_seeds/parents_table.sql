create table parents (
user_id serial primary key,
username varchar(20),
first_name varchar(20),
last_name varchar(20),
password varchar(20),
parent_password varchar(20),
experience_points int,
is_parental boolean
);