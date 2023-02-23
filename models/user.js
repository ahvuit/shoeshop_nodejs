const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    uType:{
        type: String,
        default: "USR",
    },
    active: {
      type: Boolean,
      default: true
    },
  },
);

//Export the model
module.exports = mongoose.model("User", userSchema);
