const mongoose = require('mongoose')

// user schema
const UserSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

UserSchema.index({ username: 1 })

module.exports = mongoose.model('User', UserSchema)
