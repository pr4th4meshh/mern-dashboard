import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const test = (req, res) => {
    res.json({
      message: "Api route is working!",
    })
  }