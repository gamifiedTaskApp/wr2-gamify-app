delete from tasks where user_id = $1;
delete from rewards where parent_id = $1;
delete from children where u_id = $1;
delete from parents where user_id = $1;