import Submission from '../models/Submission.js';

export const getProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const submissions = await Submission.find({ userId }).sort({ timestamp: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};