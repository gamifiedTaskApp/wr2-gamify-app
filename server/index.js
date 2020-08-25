require('dotenv').config();
let cron = require('node-cron');
const aws = require('aws-sdk');
const parentCtrl = require("./controllers/ParentController");
const childCtrl = require("./controllers/ChildController");
const emailCtrl = require("./controllers/emailController");
const Axios = require('axios')
const express = require('express'),
  massive = require('massive'),
  app = express(),
  session = require('express-session'),
  authCtrl = require('./controllers/AuthController'),
  { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

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

app.get('/sign-s3', (req, res) => {
  aws.config = {
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  const s3 = new aws.S3({ signatureVersion: 'v4' });
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };


  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
});


app.post('/api/add/task', parentCtrl.addTask);
app.post('/api/add/task/all', parentCtrl.addTasksForAll);
app.delete('/api/remove/task', parentCtrl.removeTask);
//app.delete('/api/remove/task/all/:id', parentCtrl.removeAllTasks);
app.get('/api/get/tasks/:id', parentCtrl.getAllTasks); //THIS NEEDS CTRL FUNCTION
app.get('/api/children/:id', parentCtrl.getAllChildren);
// app.delete('/api/remove/task/all/:id', parentCtrl.removeAllTasks);
app.get('/api/get/tasks/:id', parentCtrl.getAllTasks);
app.put('/api/task/complete', childCtrl.switchTaskComplete)

app.post('/api/add/reward/one', parentCtrl.addRewardForOne);
app.post('/api/add/reward/all', parentCtrl.addRewardForAll);
app.delete('/api/remove/reward/:id', parentCtrl.removeRewardFromOne);
app.delete('/api/remove/reward/all/:id', parentCtrl.removeRewardFromAll);
app.get('/api/parents/children/:userId', parentCtrl.getChildren);


//child endpoints
app.put('/api/add/points', childCtrl.addPoints)
app.put('/api/add/experience', childCtrl.addExperience)
app.put('/api/buyItem', childCtrl.buyItem)
app.put('/api/useItem', childCtrl.useItem)
app.get('/api/storeRewards/:id', childCtrl.getStoreRewards);
app.get('/api/earnedRewards/:id', childCtrl.getChildEarnedRewards);
app.put('/api/parent/changeAccount', parentCtrl.changeUserName);
app.get('/api/getPoints/:id', childCtrl.getPoints);
app.post('/api/child/tasks/', parentCtrl.getChildTasks);

app.post('/auth/register/child', authCtrl.registerChild);
app.post('/auth/login/child', authCtrl.loginChild);
app.put('/api/child/changeName', childCtrl.changeUserName);

//AUTH ENDPOINTS

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);
app.get('/auth/session', authCtrl.getSession);
app.delete('/auth/delete/user/:id', authCtrl.deleteUser);
app.delete('/auth/delete/child/:id', authCtrl.deleteChild);

//EMAIL ENDPOINTS
app.post(`/api/email`, emailCtrl.email);

app.listen(SERVER_PORT, () => console.log(`Rating on port ${SERVER_PORT}!!`));


//emailCtrl.dailyEmail();