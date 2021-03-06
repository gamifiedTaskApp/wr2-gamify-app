const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db');
    const { username, fName, lName, email, password, parentAccount } = req.body;

    const checkChildUsername = await db.auth.check_child_username(username);
    const checkUsername = await db.auth.check_username_exists(username);
    const checkEmail = await db.auth.check_email_exists(email);
    if (checkUsername[0]) {
      res.status(409).send('Username already exists');
      return;
    }
    else if (checkChildUsername[0]) {
      res.status(409).send('Username already exists');
      return;
    }
    else if(checkEmail[0]){
      res.status(409).send('Email is already assigned to an account');
      return;
    };

    
    // Commented out for testing purposes 

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const registered = await db.auth.register_user(username, fName, lName, hash, parentAccount, email);
    // console.log(registered[0])
    const user = registered[0]
    req.session.user = {
      id: user.user_id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      parental: user.is_parental,
      points: user.experience_points,
      picture: user.profile_picture
    };
    // console.log(req.session.user)
    res.status(200).send(req.session.user);
  },

  login: async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;

    const checkUsername = await db.auth.check_username_exists(username);
    const checkChildUsername = await db.auth.check_child_username(username);

    const user = checkUsername[0];
    const childUser = checkChildUsername[0];
    if (user) {
      const passCheck = bcrypt.compareSync(password, user.password);
      if (!passCheck) {
        res.status(403).send('Password is incorrect');
      };
      req.session.user = {
        id: user.user_id,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        parental: user.is_parental,
        points: user.experience_points,
        picture: user.profile_picture
      };
      // console.log(req.session.user, 'hitter')
      res.status(200).send(req.session.user);
    }
    else if (childUser) {
      const passCheck = bcrypt.compareSync(password, childUser.password);
      if (!passCheck) {
        res.status(403).send('Password is incorrect');
      };
      req.session.user = {
        id: childUser.child_id,
        username: childUser.child_username,
        parent: childUser.u_id,
        points: childUser.points,
        isChild: childUser.is_child,
        picture: childUser.profile_picture,
        experience: childUser.experience
      };
      res.status(200).send(req.session.user);
    }
    else {
      res.status(404).send('Sorry can not seem to find that username. Try again!');
    };

    const passCheck = bcrypt.compareSync(password, user.password);
    if (!passCheck) {
      res.status(403).send('Password is incorrect');
    };

    req.session.user = {
      id: user.user_id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      parental: user.is_parental,
      points: user.experience_points,
      picture: user.profile_picture
    };
    // console.log(req.session.user, 'hitter')
    res.status(200).send(req.session.user);
  },
  registerChild: async (req, res) => {
    const db = req.app.get("db");
    const { username, parentId, password, name } = req.body;

    const checkChildUsername = await db.auth.check_child_username(username);
    const checkUsername = await db.auth.check_username_exists(username);

    // console.log(checkChildUsername[0]);
    if (checkChildUsername[0]) {
      res.status(409).send('Username already exists');
      return;
      console.log("should stop here")
    }
    else if (checkUsername[0]) {
      res.status(409).send('Username already exists');
      return;
    };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registeredChild = await db.auth.register_child(parentId, hash, username, name);
    const child = registeredChild[0];

    req.session.user = {
      id: child.child_id,
      username: child.child_username,
      parent: child.u_id,
      points: child.points,
      picture: child.profile_picture,
      experience: child.experience
    };
    res.status(200).send(req.session.user);
  },
  loginChild: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const checkChildUsername = await db.auth.check_child_username(username);
    const child = checkChildUsername[0];
    if (!child) {
      res.status(404).send('Sorry can not seem to find that username. Try again!');
    }

    const passCheck = bcrypt.compareSync(password, child.password);
    if (!passCheck) {
      res.status(403).send('Password is incorrect');
    };

    req.session.user = {
      id: child.child_id,
      username: child.child_username,
      parent: child.u_id,
      points: child.points,
      picture: child.profile_picture,
      experience: child.experience
    };
    res.status(200).send(req.session.user);
  },

  logout: async(req, res) => {
    req.session.destroy()
    res.status(200).send('Successfully Logged Out!')
  },

  getSession: (req, res) => {
    if (req.session.user) {
      // console.log(req.session.user, 'hit')
      res.status(200).send(req.session.user)
    }
  },
  deleteUser: async (req, res) => {
    const db = req.app.get("db");
    const userId = req.params.id;

    const deletedUser = await db.auth.delete_user(userId);
    res.sendStatus(200);
  },
  deleteChild: async(req, res) => {
    const db = req.app.get("db");
    const childId = req.params.id;

    const deletedChild = await db.auth.delete_child(childId);
    res.sendStatus(200);
  }
};