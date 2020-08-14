create table parents (
user_id serial primary key,
username varchar(20),
first_name varchar(20),
last_name varchar(20),
password text,
email varchar(50),
parent_password text,
experience_points int,
is_parental boolean
);