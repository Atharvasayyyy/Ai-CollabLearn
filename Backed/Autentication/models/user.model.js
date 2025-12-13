import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    min : 5,
    max : 50
  },
    password: {
    type: String,
    required: false,
    }

});

userSchema.statics.hashPassword = async function(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

userSchema.methods.isValidPassword = async function(password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
}

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email }, process.env.jwtSecret, { expiresIn: '1h' });
  return token;
}

const User = mongoose.model("User", userSchema);
export default User;