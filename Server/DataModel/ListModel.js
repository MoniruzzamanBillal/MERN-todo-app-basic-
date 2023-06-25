const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  liItems: {
    type: String,
    require: true,
  },
});

const listModel = mongoose.model("ListModel", UserModel);

module.exports = listModel;
