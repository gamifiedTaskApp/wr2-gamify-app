update parents set username = $1, profile_picture = $3 where user_id = $2;

select * from parents where user_id = $2;