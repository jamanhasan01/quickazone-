import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: [true, 'Please provide your full name'] },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  photoURL: { type: String },
  role: { type: String, enum: ['admin', 'moderator', 'user'], default: 'user' },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: [6, 'password should be al least 6 characters'],
  },
})

let User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
