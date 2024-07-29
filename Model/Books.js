const { mongoose } = require("mongoose")


//state schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    coverPage: String,
    year: String,
    authorId: String,
}, { timestamp: true }

);


const Books = mongoose.model('KriscentBooks', bookSchema);
module.exports = Books