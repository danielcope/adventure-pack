const bcrypt = require('bcryptjs')

module.exports = {
  emailVerify: async (req,res) => {
  
    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user:'adventurepack98@gmail.com',
        pass:EMAIL_PASSWORD
      }
    })
  
    // const email_token


    const option = {
      from: 'adventurepack98@gmail.com',
      to: `${req.body.email}`,
      subject: 'Login Code!',
      text: 'Here is your requested code. Please enter this in to complete registration'
    }

  }
}