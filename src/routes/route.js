const express=require("express")
const router=express.Router();

const { createitem, getallitems,getitembyId, updateitem, deleteitem } = require("../controller/itemController")
router.post( '/api/items',createitem );

router.get ('/api/items',getallitems);

router.get ('api/items/:id',getitembyId)

router.put('/api/items/:id',updateitem);

router.delete('/api/items/:id',deleteitem)

module.exports=router;