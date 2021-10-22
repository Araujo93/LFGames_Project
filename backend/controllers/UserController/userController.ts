import { Request, Response } from 'express';
import cfg from '../../config';
import User from "../../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// add some user functions here
// make changeUserNameOrEmail either nonexistent or practical
// tell ppl to fuck off if they want to change their email

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body.user;
    const {userName, email } = req.body
    const user = await User.findById(email)
    if(!user) return res.status(422).send({error: 'Must be signed in'})
    const updatedUser = User.findByIdAndUpdate(email, {userName, email})
    return res.status(200).send({user});
  } catch (err) {
    console.log(err)
    res.send(500).send('Error updating user');
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;
    if (!email || !password || !userName) {
      return res.status(422).send({ error: "Must provide email and password" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send({ error: "Email already exists, Try again" });
    }
    if (password.length < 8) {
      return res.status(422).send({ error: 'Password must be at least eight characters' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, cfg.ACCESS_TOKEN_SECRET);
    res.status(200).send({ 
      user: { 
        userName, 
        email
      }, 
      token 
    });
  } catch (err) {
    console.log(err);
    return res.status(422).send('Error creating user');
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    // TODO: fix unused token here.
    const { _id } = req.body.user;
    const token = req.body.token;
    const user = await User.findById(_id);
    if (!user) res.send(422).send({ error: "No user found" });
    return res.status(200).send({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ error: "Resource not found" });
  }
};
