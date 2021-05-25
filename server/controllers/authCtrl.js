const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req,res) => {
    const db = req.app.get('db')
    const { username, password, email } = req.body;

    const [ existingUser ] = await db.auth.get_user_by_username(username);
    
    if (existingUser) {
        return res.status(409).send('User already exists')
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const [ newUser ] = await db.auth.register(username, hash, email);
    delete newUser.hash;

    req.session.user = newUser;
    
    await res.status(200).send(req.session.user)
  },
  login: async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;

    if (!username) {
      return res.status(404).send('Please enter a valid username and password')
    }
  
    const [ existingUser ] = await db.auth.get_user_by_username(username);

    if (!existingUser) {
        return res.status(404).send('User does not exist');
    }

    const isAuthenticated = bcrypt.compareSync(password, existingUser.hash);

    if (!isAuthenticated) {
        return res.status(403).send('Incorrect password')
    }

    delete existingUser.hash

    req.session.user = existingUser;

    res.status(200).send(req.session.user);
  },

  logout: async (req,res) => {
    req.session.destroy()
    return res.sendStatus(200)
  },

  checkUser: async (req,res) => {
    if(req.session.user) {
      return await res.status(200).send(req.session.user)
    } else {
      return res.status(404).send('No user logged in.')
    };
  }
}