module.exports = {
  editChar: async (req,res) => {
    // const db = req.app.get('db')
    // const {char_id} = req.params
    
    // if (req.name) {
    //   await db.edit_char_name(req.name,char_id)
    // }
    // if (req.race) {
    //   await db.edit_char_race(req.race,char_id)
    // }
    // if (req.char_class) {
    //   await db.edit_char_class(req.char_class,char_id)
    // }
    // if (req.background) {
    //   await db.edit_char_background(req.background,char_id)
    // }
    // if (req.max_hp) {
    //   await db.edit_char_max_hp(req.max_hp,char_id)
    // }
    // if (req.current_hp) {
    //   await db.edit_char_current_hp(req.current_hp,char_id)
    // }
    // if (req.proficiency) {
    //   await db.edit_char_proficiency(req.proficiency,char_id)
    // }
    // if (req.passive_perception) {
    //   await db.edit_char_passive_perception(req.passive_perception,char_id)
    // }
    // if (req.passive_insight) {
    //   await db.edit_char_passive_insight(req.passive_insight,char_id)
    // }
    // if (req.inspiration) {
    //   await db.edit_char_inspiration(req.inspiration,char_id)
    // }
    // if (req.armor_class) {
    //   await db.edit_char_armor_class(req.armor_class,char_id)
    // }
    // if (req.initiative) {
    //   await db.edit_char_initiative(req.initiative,char_id)
    // }
    // if (req.speed) {
    //   await db.edit_char_speed(req.speed,char_id)
    // }
    // if (req.max_hitdice) {
    //   await db.edit_char_max_hitdice(req.max_hitdice,char_id)
    // }
    // if (req.current_hitdice) {
    //   await db.edit_char_current_hitdice(req.current_hitdice,char_id)
    // }

    // await res.sendStatus(200)

  },

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
  }

}