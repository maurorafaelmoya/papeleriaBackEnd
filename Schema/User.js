const { Schema, model } = require('mongoose');


const UserSchema = Schema({

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
    status: {
        type: Boolean,
        default: false,
        required:true,
    },         
    createdAt: {
        type: Date, 
        default: Date.now,
        required:true,
    },          
    type: {
        type: String,
        default:'user',
        required: false,
    },
})

module.exports = model('User', UserSchema)
