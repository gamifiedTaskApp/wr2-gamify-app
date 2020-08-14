create table children (
child_id serial primary key,
u_id int references parents(user_id),
password text,
points int
);