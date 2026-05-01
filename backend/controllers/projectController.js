import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const project = new Project({ title, description: description || '', createdBy: req.userId, members: [req.userId] });
    await project.save();
    await project.populate(['createdBy', 'members']);
    res.status(201).json({ message: 'Created', project });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ $or: [{ createdBy: req.userId }, { members: req.userId }] }).populate(['createdBy', 'members']);
    res.json({ message: 'Retrieved', projects });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    if (project.createdBy.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });
    if (!project.members.includes(memberId)) project.members.push(memberId);
    await project.save();
    await project.populate(['createdBy', 'members']);
    res.json({ message: 'Added', project });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    if (project.createdBy.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });
    await Task.deleteMany({ projectId: req.params.id });
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};