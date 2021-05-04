module.exports = {
  editChar: async (req,res) => {
    const db = req.app.get('db')
    const {char_id} = req.params
    
    if (req.name) {
      await db.edit_char_name(req.name,char_id)
    }
    if (req.race) {
      await db.edit_char_race(req.race,char_id)
    }
    if (req.char_class) {
      await db.edit_char_class(req.char_class,char_id)
    }
    if (req.background) {
      await db.edit_char_background(req.background,char_id)
    }
    if (req.max_hp) {
      await db.edit_char_max_hp(req.max_hp,char_id)
    }
    if (req.current_hp) {
      await db.edit_char_current_hp(req.current_hp,char_id)
    }
    if (req.proficiency) {
      await db.edit_char_proficiency(req.proficiency,char_id)
    }
    if (req.passive_perception) {
      await db.edit_char_passive_perception(req.passive_perception,char_id)
    }
    if (req.passive_insight) {
      await db.edit_char_passive_insight(req.passive_insight,char_id)
    }
    if (req.inspiration) {
      await db.edit_char_inspiration(req.inspiration,char_id)
    }
    if (req.armor_class) {
      await db.edit_char_armor_class(req.armor_class,char_id)
    }
    if (req.initiative) {
      await db.edit_char_initiative(req.initiative,char_id)
    }
    if (req.speed) {
      await db.edit_char_speed(req.speed,char_id)
    }
    if (req.max_hitdice) {
      await db.edit_char_max_hitdice(req.max_hitdice,char_id)
    }
    if (req.current_hitdice) {
      await db.edit_char_current_hitdice(req.current_hitdice,char_id)
    }

    await res.sendStatus(200)

  },

  getChar: async (req,res) => {

  },

  addChar:  async (req,res) => {

  },

  deleteChar: async (req,res) => {
    
  }
}