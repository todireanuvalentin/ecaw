const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const CardSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  data: {
    type: String,
    required: true
  },
  img:{
    type:String,
    required:true
  }
});
//CardSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Card", CardSchema);
