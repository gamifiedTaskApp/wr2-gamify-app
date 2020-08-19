module.exports={
    addPoints:async (req,res)=>{
        const db=req.app.get("db");
        const {points, childId}=req.body;
        const updatedPoints= await db.children.add_points(points, childId)
        res.send(updatedPoints).status(200)
    },
    buyItem: async (req,res)=>{
        const db=req.app.get("db");
        console.log(req.body)
        const {rewardsPrice, childId, rewardId}=req.body;
        const updatedPoints= await db.children.remove_points(rewardsPrice, childId)
        const updatedBeenRewarded= await db.children.been_rewarded(rewardId)
        const getStoreRewards= await db.children.store_rewards(childId)
        res.send(getStoreRewards).status(200)
    },
    useItem: async (req,res)=>{
        const db=req.app.get("db");
        const {rewardId}=req.body;
        const updateBeenRewarded= await db.children.used_reward(rewardId)
        res.sendStatus(200)
    },
    getStoreRewards: async (req,res)=>{
        const db=req.app.get("db");
        const childId = req.params.id;
        console.log(childId)
        const getStoreRewards= await db.children.store_rewards(childId)
        console.log(getStoreRewards)
        res.send(getStoreRewards).status(200)
    },
    changeUserName: async(req, res) =>{
        const db = req.app.get('db');
        const {username, userId} = req.body;

        console.log(username, userId)

        const checkChildUsername = await db.auth.check_child_username(username);

        
        const checkUsername = await db.auth.check_username_exists(username);
        if (checkUsername[0]) {
            res.status(409).send('Username already exists');
        }
        else if (checkChildUsername[0]) {
            res.status(409).send('Username already exists');
        }
        const newUsername = await db.children.change_username(username, userId);
        res.sendStatus(200);
    },
    getChildEarnedRewards: async (req, res) => {
        const db = req.app.get("db");
        const childId = req.params.id;
        const earnedRewards = await db.children.reward_rewards(childId)
        res.status(200).send(earnedRewards)
    }
}
