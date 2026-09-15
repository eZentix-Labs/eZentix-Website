import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

/* The account behind a portal login. Password is never stored in the
   clear — only the bcrypt hash, and it is hidden from queries by
   default (select: false) so it cannot leak through a stray .find(). */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    businessName: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
  },
  { timestamps: true },
)

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.matches = function matches(plain) {
  return bcrypt.compare(plain, this.password)
}

/* What the client is allowed to see. */
userSchema.methods.toPublic = function toPublic() {
  return {
    id: this._id,
    email: this.email,
    businessName: this.businessName,
    role: this.role,
  }
}

export default mongoose.model('User', userSchema)
