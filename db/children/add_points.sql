update children
set points = points + $1
WHERE child_id = $2;