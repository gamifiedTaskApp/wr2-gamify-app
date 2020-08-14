module.exports = {
    addTask: async(req, res) =>{
        const db = req.app.get("db");
        const {taskName, pointsGained, taskDescription, userId, childId} = req.body;
        let date = new Date().toDateString();
        console.log(date)
        const newTask = await db.parents.add_task(userId, childId, taskName, taskDescription, pointsGained, date)
        res.send(newTask).status(200);
    },
    removeTask: async(req, res) =>{
        const db = req.app.get("db");
        const taskId = req.params.id;
        console.log(taskId);
        const removedTask = await db.parents.remove_task(taskId);
        res.sendStatus(200);
    },
    addRewardForOne: async(req, res) => {
        const db = req.app.get("db");
        const {rewardName, rewardPrice, parentId, childId, } = req.body;

        const newReward = await db.parents.add_reward(parentId, childId, rewardName, rewardPrice);
        res.send(newReward).status(200);
    },
    addRewardForAll: async(req, res) =>{
        const db = req.app.get("db");
        const {rewardName, rewardPrice, parentId} = req.body;

        const children = await db.parents.get_children(parentId);
        console.log(children);
        for (let i = 0; i < children.length; i++){
            const newRewards = await db.parents.add_reward(parentId, children[i].child_id, rewardName, rewardPrice);
        }
        
        res.sendStatus(200);
    },
    removeRewardFromOne: async(req, res) =>{
        const db = req.app.get("db");
    }
}