
module.exports = {
  

  getChar: async (req,res) => {
    const db = req.app.get('db');
    const { user_id } = req.session.user;
    const characters = await db.char.get_char(user_id);
    
    res.status(200).send(characters)
  },
  
  addChar:  async (req,res) => {
    const db = req.app.get('db');
    
    const {
      user_id,
      name,
      race,
      char_class,
      background,
      max_hp,
      proficiency,
      passive_perception,
      passive_insight,
      inspiration,
      armor_class,
      initiative,
      speed, 
      max_hitdice
    } = req.body;

    const current_hp = max_hp
    const current_hitdice = max_hitdice

    await db.char.add_char(user_id,
      name,
      race,
      char_class,
      background,
      max_hp,
      current_hp,
      proficiency,
      passive_perception,
      passive_insight,
      inspiration,
      armor_class,
      initiative,
      speed, 
      max_hitdice,
      current_hitdice
      )

      res.sendStatus(200)
  },

  deleteChar: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;

    await db.char.delete_char(char_id);

    res.sendStatus(200);
  },

  addHealth: async (req,res) => {
    const db = req.app.get('db');
    const {char_id} = req.params;
    const {new_hp} = req.body;

    await db.char.edit_char_current_hp(new_hp,char_id)

    res.sendStatus(200)
  },

  subHealth: async (req,res) => {
    const db = req.app.get('db');
    const {char_id} = req.params;
    const {new_hp} = req.body;

    await db.char.edit_char_current_hp(new_hp,char_id);

    res.sendStatus(200);
  }, 

  fullHeal: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { max_hp } = req.body;
    
    await db.char.edit_char_current_hp(max_hp,char_id)
    
    res.sendStatus(200);
    
  },
  
  changeDice: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { new_hd } = req.body;
    
    await db.char.edit_current_hitdice(new_hd,char_id)
    
    res.sendStatus(200)
  },

  editName: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newName } = req.body;
    
    await db.char.edit_char_name(newName,char_id);
    
    res.sendStatus(200);
  },
  
  editRace: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newRace } = req.body;
    
    await db.char.edit_char_race(newRace,char_id)
    
    res.sendStatus(200)
  },
  
  editClass: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newClass } = req.body;

    await db.char.edit_char_class(newClass,char_id)
    
    res.sendStatus(200)
    
  },
  
  editBackground: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newBackground } = req.body;
  
    await db.char.edit_char_background(newBackground,char_id)
    
    res.sendStatus(200)
  },
  
  editAC: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newAC } = req.body;
  
    await db.char.edit_char_armor_class(newAC,char_id)
    
    res.sendStatus(200)
  },
  
  editSpeed: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newSpeed } = req.body;
  
    await db.char.edit_speed(newSpeed,char_id)
    
    res.sendStatus(200)
    
  },
  
  editInitiative: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newInitiative } = req.body;
  
    await db.char.edit_char_initiative(newInitiative,char_id)
    
    res.sendStatus(200)

  },
  editProficiency: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newProficiency } = req.body;
  
    await db.char.edit_char_proficiency(newProficiency,char_id)
    
    res.sendStatus(200)

  },
  editMaxHP: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newMaxHP } = req.body;
  
    await db.char.edit_char_max_hp(newMaxHP,char_id)
    
    res.sendStatus(200)

  },
  editInspiration: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newInspiration } = req.body;
  
    await db.char.edit_char_inspiration(newInspiration,char_id)
    
    res.sendStatus(200)

  },
  editPP: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newPP } = req.body;
  
    await db.char.edit_passive_perception(newPP,char_id)
    
    res.sendStatus(200)

  },
  editPI: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newPI } = req.body;
  
    await db.char.edit_char_passive_insight(newPI,char_id)
    
    res.sendStatus(200)

  },
  editMaxHD: async (req,res) => {
    const db = req.app.get('db');
    const { char_id } = req.params;
    const { newHD } = req.body;
  
    await db.char.edit_max_hitdice(newHD,char_id)
    
    res.sendStatus(200)

  }

}