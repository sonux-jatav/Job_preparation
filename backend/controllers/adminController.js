import Mcq from '../models/Mcq.js';
import CodingProblem from '../models/CodingProblem.js';
import InterviewQuestion from '../models/InterviewQuestion.js';

export const addMcq = async (req, res) => {
  try {
    const mcq = new Mcq(req.body);
    await mcq.save();
    res.status(201).json(mcq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editMcq = async (req, res) => {
  try {
    const { id } = req.params;
    const mcq = await Mcq.findByIdAndUpdate(id, req.body, { new: true });
    res.json(mcq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMcq = async (req, res) => {
  try {
    const { id } = req.params;
    await Mcq.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCoding = async (req, res) => {
  try {
    const problem = new CodingProblem(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editCoding = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await CodingProblem.findByIdAndUpdate(id, req.body, { new: true });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCoding = async (req, res) => {
  try {
    const { id } = req.params;
    await CodingProblem.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addInterview = async (req, res) => {
  try {
    const question = new InterviewQuestion(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await InterviewQuestion.findByIdAndUpdate(id, req.body, { new: true });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;
    await InterviewQuestion.findByIdAndDelete(id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};