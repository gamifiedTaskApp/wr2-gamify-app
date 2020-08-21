const bcrypt = require('bcryptjs')

module.exports = {
  getAllTasks: async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const tasks = await db.parents.get_all_tasks(id);
    res.status(200).send(tasks);
  },
  getChildTasks: async(req, res) =>{
    const db = req.app.get("db");
    const {childId, date} = req.body
    console.log(childId)
    console.log(date)
    const childTasks = await db.children.get_child_tasks(childId);
    console.log(childTasks)
    let todaysTasks = [];
    for(let i = 0; i < childTasks.length; i++){
      if(childTasks[i].date === date){
        todaysTasks.push(childTasks[i])
      }
    }
    res.status(200).send(todaysTasks)
  },
  addTask: async (req, res) => {
    const db = req.app.get("db");
    const { taskName, pointsGained, taskDescription, userId, childId, date } = req.body;
    const newTask = await db.parents.add_task(userId, childId, taskName, taskDescription, pointsGained, date)
    res.send(newTask).status(200);
  },
  addTasksForAll: async (req, res) => {
    const db = req.app.get('db')
    const { taskName, pointsGained, taskDescription, userId } = req.body
    const date = new Date();
    const children = await db.parents.get_children(userId)
    for (let i = 0; i < children.length; i++) {
      await db.parents.add_task(userId, children[i].child_id, taskName, taskDescription, pointsGained, date)
    }
    const allTasks = await db.get_all_tasks(userId);
    res.status(200).send(allTasks);

  },
  removeTask: async (req, res) => {
    const db = req.app.get("db");
    const { id, userId } = req.query
    const removedTask = await db.parents.remove_task(id);
    const updatedTasks = await db.parents.get_all_tasks(userId);
    res.status(200).send(updatedTasks);
  },
  // removeAllTasks: async (req, res) => {
  //   const db = req.app.get("db")
  //   const taskId = req.params.id
  //   const allTasks = await db.parents.get_task_info(taskId)
  //   console.log(allTasks)
  //   for (let i = 0; i < allTasks.length; i++) {
  //     const { user_id, task_name } = allTasks[i]
  //     const removedReward = await db.parents.remove_tasks(user_id, task_name)
  //   }
  //   res.sendStatus(200)
  // },



  addRewardForOne: async (req, res) => {
    const db = req.app.get("db");
    const { rewardName, rewardPrice, parentId, childId, } = req.body;

    const newReward = await db.parents.add_reward(parentId, childId, rewardName, rewardPrice);
    res.send(newReward).status(200);
  },
  addRewardForAll: async (req, res) => {
    const db = req.app.get("db");
    const { rewardName, rewardPrice, parentId } = req.body;

    const children = await db.parents.get_children(parentId);
    console.log(children);
    for (let i = 0; i < children.length; i++) {
      const newRewards = await db.parents.add_reward(parentId, children[i].child_id, rewardName, rewardPrice);
    }

    res.sendStatus(200);
  },
  removeRewardFromOne: async (req, res) => {
    const db = req.app.get("db");
    const rewardId = req.params.id;
    console.log(rewardId)
    const removeRewardFromOne = await db.parents.remove_reward(rewardId)
    res.send(removeRewardFromOne).status(200);
  },
  removeRewardFromAll: async (req, res) => {
    const db = req.app.get('db')
    const rewardId = req.params.id;
    const allRewards = await db.parents.get_reward_info(rewardId)
    console.log(allRewards)
    for (let i = 0; i < allRewards.length; i++) {
      const { parent_id, name } = allRewards[i]
      const removedReward = await db.parents.remove_rewards(parent_id, name)
    }
    res.sendStatus(200)
  },
  changeUserName: async (req, res) => {
    const db = req.app.get('db');
    const { username, userId } = req.body;

    const checkChildUsername = await db.auth.check_child_username(username);
    const checkUsername = await db.auth.check_username_exists(username);
    if (checkUsername[0]) {
      res.status(409).send('Username already exists');
    }
    else if (checkChildUsername[0]) {
      res.status(409).send('Username already exists');
    }
    const newUsername = await db.parents.change_username(username, userId);
    res.sendStatus(200);
  },
  getAllChildren: async (req, res) => {
    const db = req.app.get('db');
    const parentId = req.params.id;
    const children = await db.parents.get_children_data(parentId);
    res.status(200).send(children);
  },
  getChildren: async (req, res) => {
    const db = req.app.get('db');
    const { userId } = req.params;

    const children = await db.parents.get_all_children(userId);
    res.status(200).send(children)
  }
};