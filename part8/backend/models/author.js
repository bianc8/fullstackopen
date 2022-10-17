const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  born: {
    type: Number,
    required: true
  },
  bookCount: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Author', schema)