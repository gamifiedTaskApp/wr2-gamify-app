update children set child_username = $1, profile_picture = $3 where child_id = $2;

select * from children where child_id = $2