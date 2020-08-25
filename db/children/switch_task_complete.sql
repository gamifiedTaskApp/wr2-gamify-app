update tasks set completed = $1 where task_id = $2
returning points_gained, child_id;