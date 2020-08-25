insert into children (
  u_id,
  password,
  points,
  child_username,
  child_name,
  profile_picture
) values (
  $1, $2, 0, $3, $4, 'https://robohash.org/'$3
)

returning *;