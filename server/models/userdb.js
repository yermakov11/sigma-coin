const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    login:{type: String,required: true,unique: true},
    name:{type: String,required: true},
    surname:{type: String,required: true},
    password:{type: String,required: true},
    email:{type: String,required: true, unique: true},
});

module.exports=mongoose.model('users', userSchema);