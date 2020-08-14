insert into children (
  u_id,
  password,
  points,
  child_username
) values (
  $1, $2, 0, $3
)

returning *;