const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  recruiter: {
      type: Boolean,
      required: true
  },
  student: {
      type: Boolean,
      required:true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
    UserSchema.methods.validPassword = function(p){
      return p === this.password
    }
module.exports = UserSchema