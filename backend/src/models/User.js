const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    company: { type: String, trim: true },
    role: { type: String, enum: ['admin', 'staff', 'customer'], default: 'customer' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hash(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods.comparePassword = function compare(plain) {
  return bcrypt.compare(plain, this.password);
};

userSchema.methods.toSafeJSON = function safe() {
  return { id: this._id, name: this.name, email: this.email, company: this.company, role: this.role };
};

module.exports = mongoose.model('User', userSchema);
