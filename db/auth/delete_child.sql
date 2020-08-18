delete from tasks where child_id = $1;
delete from rewards where kid_id = $1;
delete from children where child_id = $1;