module.exports = {
  emailVerify: async (req,res) => {
  //   const db = req.app.get('db')

  //   const transporter = nodemailer.createTransport({
  //     service:'gmail',
  //     auth: {
  //       user:'adventurepack98@gmail.com',
  //       pass:EMAIL_PASSWORD
  //     }
  //   })
      
  //   const option = {
  //     from: 'adventurepack98@gmail.com',
  //     to: `${req.body.email}`,
  //     subject: 'Login Code!',
  //     text: `Please enter this in to the token input field to complete registration: ${email_token}`
  //   }

  //   transporter.sendMail(option, function(err) {
  //     if(err) {
  //       console.log('Email not sent.')
  //     } else {
  //       console.log('Email token sent.')
  //     }
  //   })

  },

  emailThanks: async (req,res) => {
    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user:'adventurepack98@gmail.com',
        pass:EMAIL_PASSWORD
      }
    })
      
    const option = {
      from: 'adventurepack98@gmail.com',
      to: `${req.body.email}`,
      subject: 'Thanks for registering!',
      text: `Thank you for registering with us! `
    }

    transporter.sendMail(option, function(err) {
      if(err) {
        console.log('Email not sent.')
      } else {
        console.log('Email token sent.')
      }
    })
  }
}