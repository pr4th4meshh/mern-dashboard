import Client from "../models/client.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

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