const mongoose = require('mongoose');

const Photos = require('./photo');

const userSchema = mongoose.Schema({
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  photos: {type:String},
  profilePicture:  String,
  bio: {type: String, maxlength: 150},
  socialMedia: [{twitter:String, facebook:String, instagram: String}]
})

module.exports = mongoose.model('User', userSchema);
