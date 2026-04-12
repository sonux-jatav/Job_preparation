import mongoose from 'mongoose';

const codingSchema = new mongoose.Schema({
  title: String,
  description: String,
  examples: [{ input: String, output: String }],
  testCases: [{ input: String, output: String }],
  companyTag: String,
});

export default mongoose.model('CodingProblem', codingSchema);