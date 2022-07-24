const mongoose = require('mongoose')

const url = 'mongodb://fullstack:fullstackopen22@ac-stenzlo-shard-00-00.0slh487.mongodb.net:27017,ac-stenzlo-shard-00-01.0slh487.mongodb.net:27017,ac-stenzlo-shard-00-02.0slh487.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-wv91cv-shard-0&authSource=admin&retryWrites=true&w=majority'

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*
// Generate new note
console.log("trying to connect")
mongoose
.connect(url)
.then((result) => {
    console.log('connected')
    
    const note = new Note({
      content: 'HTML is Easy',
      date: new Date(),
      important: true,
    })

    return note.save()
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))

*/

// Find all notes
console.log("trying to connect")
mongoose
.connect(url)
.then((result) => {
    console.log('connected')
    
    Note.find({ important: true }).then(result => {
        result.forEach(note => {
        console.log(note)
        })
        mongoose.connection.close()
    })
})