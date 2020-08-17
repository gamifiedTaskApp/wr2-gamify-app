update rewards
set been_rewarded = false
WHERE reward_id = $1;