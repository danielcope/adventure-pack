require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./controllers/authCtrl')
const charCtrl = require('./controllers/charCtrl')
const backpackCtrl = require('./controllers/backpackCtrl')
const journalCtrl = require('./controllers/journalCtrl')
const npcCtrl = require('./controllers/npcCtrl')
const spellsCtrl = require('./controllers/spellsCtrl')
const nodemailer = require('./controllers/nodemailer');
const app = express();
const { SERVER_PORT,CONNECTION_STRING,SESSION_SECRET,EMAIL_PASSWORD } = process.env;

app.use(express.json());

app.use(express.static(`${__dirname}/../build`))

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
app.get( '/auth/who', authCtrl.checkUser )
app.post( '/auth/register', authCtrl.register )
app.post( '/auth/login', authCtrl.login )
app.delete( '/auth/logout', authCtrl.logout )

//NodeMailer endpoint (email verification)
app.post( '/auth/valid', nodemailer.emailVerify)
app.post( '/auth/emailthanks', nodemailer.emailThanks)

//Character endpoints
app.get( '/api/character', charCtrl.getChar )
app.post( '/api/character', charCtrl.addChar )
app.put('/api/addhealth/:char_id', charCtrl.addHealth)
app.put('/api/subhealth/:char_id', charCtrl.addHealth)
app.put('/api/fullheal/:char_id', charCtrl.fullHeal)
app.put('/api/changedice/:char_id', charCtrl.changeDice )
app.put('/api/changename/:char_id', charCtrl.editName)
app.put('/api/changerace/:char_id', charCtrl.editRace)
app.put('/api/changeclass/:char_id', charCtrl.editClass)
app.put('/api/changebackground/:char_id', charCtrl.editBackground)
app.put('/api/changeac/:char_id', charCtrl.editAC)
app.put('/api/changespeed/:char_id', charCtrl.editSpeed)
app.put('/api/changeinitiative/:char_id', charCtrl.editInitiative)
app.put('/api/changeproficiency/:char_id', charCtrl.editProficiency)
app.put('/api/changemaxhp/:char_id', charCtrl.editMaxHP)
app.put('/api/changeinspiration/:char_id', charCtrl.editInspiration)
app.put('/api/changepp/:char_id', charCtrl.editPP)
app.put('/api/changepi/:char_id', charCtrl.editPI)
app.put('/api/changemaxhd/:char_id', charCtrl.editMaxHD)
app.delete( '/api/sacrifice/:char_id', charCtrl.deleteChar )

//Backpack endpoints
app.get( '/api/backpack/:char_id', backpackCtrl.getItem )
app.post( '/api/backpack', backpackCtrl.addItem )

app.put( '/api/backpack/:item_id', backpackCtrl.editName )
app.put( '/api/backpackdesc/:item_id', backpackCtrl.editDesc )
app.delete( '/api/backpack/:item_id', backpackCtrl.deleteItem )

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
app.get( '/api/spell', spellsCtrl.getSpell )
app.post( '/api/spell', spellsCtrl.addSpell )
app.put( '/api/spell', spellsCtrl.editSpell )
app.delete( '/api/spell', spellsCtrl.deleteSpell )



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