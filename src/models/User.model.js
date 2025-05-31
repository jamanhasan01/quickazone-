import mongoose from 'mongoose'
import bcrypt from 'bcrypt' // Import bcryptjs

const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
)

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next()
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10) // 10 is a good default for bcrypt salt rounds
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt)
    next() // Continue with the save operation
  } catch (error) {
    next(error) // Pass any errors to the next middleware
  }
})

// Optional: Add a method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

let User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
