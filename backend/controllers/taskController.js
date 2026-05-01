import Task from '../models/Task.js';
import Project from '../models/Project.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, deadline } = req.body;
    if (!title || !projectId || !assignedTo) return res.status(400).json({ message: 'Missing fields' });
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const task = new Task({ title, description: description || '', projectId, assignedTo, deadline: deadline || null });
    await task.save();
    await task.populate(['projectId', 'assignedTo']);
    res.status(201).json({ message: 'Created', task });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { projectId, status } = req.query;
    const filter = {};
    if (projectId) filter.projectId = projectId;
    else {
      const projects = await Project.find({ $or: [{ createdBy: req.userId }, { members: req.userId }] });
      filter.projectId = { $in: projects.map(p => p._id) };
    }
    if (status) filter.status = status;
    const tasks = await Task.find(filter).populate(['projectId', 'assignedTo']);
    res.json({ message: 'Retrieved', tasks });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['todo', 'in-progress', 'done'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate(['projectId', 'assignedTo']);
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Updated', task });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};