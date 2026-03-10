const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    enum: ["admin", "user"],
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("firstData", dataSchema);
