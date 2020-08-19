insert into children (
  u_id,
  password,
  points,
  child_username,
  child_name
) values (
  $1, $2, 0, $3, $4
)

returning *;