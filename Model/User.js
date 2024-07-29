const { mongoose } = require("mongoose")


//state schema
const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    userType: {
        type: String,
        enum: ['ADMIN', 'AUTHOR', 'READER'],
        default: 'user'
    },
}, { timestamp: true }

);


const User = mongoose.model('kriscentUser', userSchema);
module.exports = User