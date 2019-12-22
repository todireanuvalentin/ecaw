const mongoose = require("mongoose");

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

module.exports = mongoose.model("Card", CardSchema);
