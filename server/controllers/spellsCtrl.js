module.exports = {

  getSpell: async (req,res) => {
    const db = req.app.get('db')
    const { char_id } = req.params
    
    const spells = await db.spell.get_char_spells(char_id);

    res.status(200).send(spells)
  },

  addSpell: async (req,res) => {
    const db = req.app.get('db');
    const { char_id,spell_name,spell_index,spell_level } = req.body;
    
    await db.spell.add_to_spellbook(char_id,spell_name,spell_index,spell_level);

    res.sendStatus(200)
  },

  deleteSpell: async (req,res) => {
    const db = req.app.get('db')
    const { spellbook_id } = req.params

    await db.spell.remove_spell_from_char(spellbook_id)

    res.sendStatus(200)
  }

}