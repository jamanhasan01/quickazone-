import mongoose from 'mongoose'

import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photoURL:{type:String,required:true},
    passwordHash: { type: String, required: true }, // ← store the bcrypt hash here
    role: {
      type: String,
      enum: ['admin', 'moderator', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) return
  const salt = await bcrypt.genSalt(10)
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
