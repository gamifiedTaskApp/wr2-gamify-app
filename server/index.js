const parentCtrl = require("./controllers/ParentController");
require('dotenv').config()
const express = require('express'),
  massive = require('massive'),
  app = express(),
  session = require('express-session'),
  { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json())
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
app.delete('/api/remove/task/:id', parentCtrl.removeTask);

app.post('/api/add/reward/one', parentCtrl.addRewardForOne);
app.post('/api/add/reward/all', parentCtrl.addRewardForAll);

app.listen(SERVER_PORT, () => console.log(`Rating on port ${SERVER_PORT}!!`));