import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  question: String,
  type: String,
  companyTag: String
});

export default mongoose.model('InterviewQuestion', interviewSchema);