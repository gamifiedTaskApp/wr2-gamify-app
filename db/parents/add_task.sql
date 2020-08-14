insert into tasks 
(user_id, child_id, task_name, task_description, points_gained, date, completed) 
values ($1, $2, $3, $4, $5, $6, false);
