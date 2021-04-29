require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const app = express();
// const nodemailer = require('nodemailer');


const { SERVER_PORT,CONNECTION_STRING,SESSION_SECRET,EMAIL_PASSWORD } = process.env;
app.use(express.json());


app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 52
  }
}))

//-------------Endpoints------------------
//Auth endpoints
app.get( '/auth/who', authCtrl.getUser )
app.post( '/auth/register', authCtrl.register )
app.post( '/auth/login', authCtrl.login )
app.delete( '/auth/logout', authCtrl.logout )

//NodeMailer endpoint (email verification)
app.post( '/auth/valid', nodemailer.emailVerify)

//Character endpoints
app.get( '/api/character', charCtrl.getChar )
app.post( '/api/character', charCtrl.addChar )
app.put( '/api/character', charCtrl.editChar )
app.delete( '/api/character', charCtrl.deleteChar )

//Backpack endpoints
app.get( '/api/character', backpackCtrl.getItem )
app.post( '/api/character', backpackCtrl.addItem )
app.put( '/api/character', backpackCtrl.editItem )
app.delete( '/api/character', backpackCtrl.deleteItem )

//Journal endpoints
app.get( '/journal/entry', journalCtrl.getEntry )
app.post( '/journal/entry', journalCtrl.addEntry )
app.put( '/journal/entry', journalCtrl.editEntry )
app.delete( '/journal/entry', journalCtrl.deleteEntry )

//NPC endpoints
app.get( '/journal/npc', npcCtrl.getNPC )
app.post( '/journal/npc', npcCtrl.addNPC )
app.put( '/journal/npc', npcCtrl.editNPC )
app.delete( '/journal/npc', npcCtrl.deleteNPC )

//Spell endpoints
app.get( '/api/spell', spell.getSpell )
app.add( '/api/spell', spell.addSpell )
app.post( '/api/spell', spell.editSpell )
app.delete( '/api/spell', spell.deleteSpell )



//-------------------------------------------

massive ({
    connectionString: CONNECTION_STRING,
    ssl:{
      rejectUnauthorized:false
    }
  })
    .then(dbInst => {
      app.set('db',dbInst)
        
      app.listen(SERVER_PORT,() => console.log(`Server running on port` + ' ' + SERVER_PORT))
    })
    .catch(err => console.log(err))