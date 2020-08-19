insert into parents (
  username,
  first_name,
  last_name,
  password,
  is_parental,
  email,
  experience_points,
  profile_picture
) values (
  $1, $2, $3, $4, $5, $6, 0, 'https://robohash.org/'$1
)

returning *;