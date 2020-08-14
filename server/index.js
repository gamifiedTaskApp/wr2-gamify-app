require('dotenv').config();
const parentCtrl = require("./controllers/ParentController");
const childCtrl = require("./controllers/ChildController");
const express = require('express'),
  massive = require('massive'),
  app = express(),
  session = require('express-session'),
  authCtrl = require('./controllers/AuthController'),
  { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(db => {
  app.set('db', db)
  console.log("DB connected!")
}).catch(error => {
  console.log(error)
});

app.post('/api/add/task', parentCtrl.addTask);
app.post('/api/add/task/all', parentCtrl.addTasksForAll);
app.delete('/api/remove/task/:id', parentCtrl.removeTask);
app.delete('/api/remove/task/all/:id', parentCtrl.removeAllTasks);

app.post('/api/add/reward/one', parentCtrl.addRewardForOne);
app.post('/api/add/reward/all', parentCtrl.addRewardForAll);
app.delete('/api/remove/reward/:id', parentCtrl.removeRewardFromOne);
app.delete('/api/remove/reward/all/:id', parentCtrl.removeRewardFromAll);

//child endpoints
app.put('/api/add/points', childCtrl.addPoints)
app.put('/api/remove/points', childCtrl.spendPoints)

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);

app.post('/auth/register/child', authCtrl.registerChild);
app.post('/auth/login/child', authCtrl.loginChild);

app.listen(SERVER_PORT, () => console.log(`Rating on port ${SERVER_PORT}!!`));
//AUTH ENDPOINTS

