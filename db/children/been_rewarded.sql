update rewards
set been_rewarded = true
WHERE reward_id = $1;