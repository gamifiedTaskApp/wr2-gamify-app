const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db');
    const { username, fName, lName, email, password, parentAccount } = req.body;

    const checkUsername = await db.auth.check_username_exists(username);
    if (checkUsername[0]) {
      res.status(409).send('Username already exists');
    };

    const checkEmail = await db.auth.check_email_exists(email);
    if (checkEmail[0]) {
      res.status(409).send('Email is already assigned to an account');
    };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const registered = await db.auth.register_user(username, fName, lName, hash, parentAccount, email);
    // console.log(registered[0])
    const user = registered[0]
    req.session.user = {
      id: user.user_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      parental: user.is_parental,
      points: user.experience_points
    };
    // console.log(req.session.user)
    res.status(200).send(req.session.user);
  },

  login: async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;

    const checkUsername = await db.auth.check_username_exists(username);
    const user = checkUsername[0];
    if (!user) {
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
      points: user.experience_points
    };
    // console.log(req.session.user, 'hitter')
    res.status(200).send(req.session.user);
  }
};