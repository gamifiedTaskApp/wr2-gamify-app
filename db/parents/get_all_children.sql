select * from parents p 
join children c on c.u_id = p.user_id
where p.user_id = $1;