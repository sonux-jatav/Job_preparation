import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, default: 'user' },
  progress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
  isVerified: { type: Boolean, default: true },
  resetToken: String,
  resetTokenExpiry: Date
});

export default mongoose.model('User', userSchema);