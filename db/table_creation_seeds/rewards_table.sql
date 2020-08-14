create table rewards (
reward_id serial primary key,
parent_id int references parents(user_id),
kid_id int references children(child_id),
name varchar(100),
rewards_price int,
been_rewarded boolean
);