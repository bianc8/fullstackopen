const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  published: {
    type: Number
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  genres: [
    {
      type: String,
      minlength: 3
    },
  ]
})

module.exports = mongoose.model('Book', schema)