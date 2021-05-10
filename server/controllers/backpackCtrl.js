module.exports = {
  getItem: async (req,res) => {
    const db = req.app.get('db')
    const { char_id } = req.params;
    const items = await db.backpack.get_item()

    res.status(200).status(items)
  },

  addItem: async (req,res) => {

  },

  editItem: async (req,res) => {

  },

  deleteItem: async (req,res) => {
    
  }

}