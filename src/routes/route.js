const express=require("express")
const router=express.Router();

const { createitem, getallitems, updateitem, deleteitem } = require("../controller/item")
router.post( '/api/items',createitem );

router.get ('/api/items',getallitems);

router.put('/api/items/:id',updateitem);

router.delete('/api/items/:id',deleteitem)

module.exports=router;