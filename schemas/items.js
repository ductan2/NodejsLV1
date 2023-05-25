const mongoose =  require('mongoose');

var schema = new mongoose.Schema({
   name:"string",
   status:"string",
   odering:"string"
})

module.exports=mongoose.model('items',schema);