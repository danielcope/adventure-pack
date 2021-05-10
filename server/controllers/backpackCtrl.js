module.exports = {
  getItem: async (req,res) => {
    const db = req.app.get('db')
    const { char_id } = req.params;

    const items = await db.backpack.get_item(char_id)


    res.status(200).send(items)
  },

  addItem: async (req,res) => {
    const db = req.app.get('db')
    const { char_id,name,desc } = req.body 

    await db.backpack.add_item(char_id,name,desc)

    res.sendStatus(200)

  },

  editName: async (req,res) => {
    const db = req.app.get('db')
    const {item_id} = req.params
    const { name } = req.body

    await db.backpack.edit_item_name(name,item_id)

    res.sendStatus(200)
  },

  editDesc: async (req,res) => {
    const db = req.app.get('db')
    const  {item_id } = req.params
    const { desc } = req.body
    
    await db.backpack.edit_item_desc(desc,item_id)
    
    res.sendStatus(200)
  },
  
  deleteItem: async (req,res) => {
    const db = req.app.get('db')
    const  {item_id } = req.params
    
    await db.backpack.delete_item(item_id)

    res.sendStatus(200)
  }

}