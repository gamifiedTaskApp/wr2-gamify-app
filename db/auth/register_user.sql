insert into parents (
  username,
  first_name,
  last_name,
  password,
  is_parental,
  email,
  experience_points
) values (
  $1, $2, $3, $4, $5, $6, 0
)

returning *;