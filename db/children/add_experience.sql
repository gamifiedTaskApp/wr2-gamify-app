update children
set experience = experience + $1
WHERE child_id = $2
returning experience;