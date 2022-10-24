const mongoose = require('mongoose')

/*
For simplicity's sake, let's assume that all users have the same password which is hardcoded to the system.
*/

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favouriteGenre: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', schema)