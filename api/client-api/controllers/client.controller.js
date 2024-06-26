import Client from "../models/client.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../../utils/error.js';

export const signupClient = async (req, res, next) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newClient = new Client({ username, email, password: hashedPassword, role });
    try {
      await newClient.save();
      res.status(201).json("New user created successfully");
    } catch (error) {
      next(error);
    }
  };

export const signinClient = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validClient = await Client.findOne({ email });
      if (!validClient) return next(errorHandler(404, "User not found"));
      const validPassword = bcrypt.compareSync(password, validClient.password);
      if (!validPassword) return next(errorHandler(404, "Invalid Credentials"));
      const token = jwt.sign(
        { id: validClient._id},
        "thisismyjwtsecretkeyforthisapp"
      );
      const { password: pass, ...rest } = validClient._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const signoutClient = async (req, res, next) => {
    try {
      res.clearCookie("access_token")
      res.status(200).json({ message: "User has been signed out..." })
    } catch (error) {
      next(error)
    }
  }

  export const getClientDetails = async (req, res, next) => {
    try {
      const user = await Client.findById(req.params.id)
  
      if (!user) return next(errorHandler(404, "User not found!"))
  
      const { password: pass, ...rest } = user._doc
  
      res.status(200).json(rest)
    } catch (error) {
      next(error)
    }
  }

  export const editClient = async (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;
  
    try {
      // Prepare the update object
      const updateFields = {};
      if (username) updateFields.username = username;
      if (email) updateFields.email = email;
      if (password) {
        updateFields.password = await bcrypt.hash(password, 10);
      }
  
      // Update the client document using $set
      const updatedClient = await Client.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        { new: true }
      ).select('-password'); // Exclude the password field
  
      if (!updatedClient) {
        return res.status(404).json({ message: 'User not found' });
      }  
  
      res.status(200).json({ message: 'User updated successfully', user: updatedClient });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };