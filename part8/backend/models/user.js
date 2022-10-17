const mongoose = require('mongoose')

/*
For simplicity's sake, let's assume that all users have the same password which is hardcoded to the system.
The idea is that when a user, e.g. mluukkai, adds a person, e.g. Arto Hellas, to the list, the person is added to their friends list.
*/

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  favouriteGenre: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', schema)