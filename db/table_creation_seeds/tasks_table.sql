create table tasks (
task_id serial primary key,
user_id int references parents(user_id),
child_id int references children(child_id),
task_name varchar(100),
task_description varchar(500),
points_gained int,
date date,
completed boolean
);