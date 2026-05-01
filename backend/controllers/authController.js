import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { validateEmail, validatePassword } from '../utils/validators.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    if (!validateEmail(email)) return res.status(400).json({ message: 'Invalid email' });
    if (!validatePassword(password)) return res.status(400).json({ message: 'Password min 6' });
    if (await User.findOne({ email })) return res.status(409).json({ message: 'Email exists' });
    
    const user = new User({ name, email, password, role: role || 'member' });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Registered', token, user: { id: user._id, name, email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login successful', token, user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};