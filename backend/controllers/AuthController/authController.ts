import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';
import User from '../../models/user';
import Games from '../../models/games';
import Blacklist from '../../models/blacklist';
import bcrypt from 'bcrypt';
import cfg from '../../config';

export const signIn = async (req: Request, res: Response) => {
  const { email, password, userName } = req.body;
  if (!email || !password || !userName) {
    return res.status(422).send({ error: "Must provide email and password" });
  }
  try {
    const user = await User.findOne({ email });
    const games = await user.populate('games');
    if (!user) {
      return res.status(404).send({ error: "Email not found" });
    }

    bcrypt.compare(password, user.password, (err: Error, isValid: Boolean) => {
      if (!isValid || err) {
        return res.status(422).send({ error: "Invalid email or password" });
      }
      if (isValid) {
        const token = jwt.sign({ userId: user._id }, cfg.ACCESS_TOKEN_SECRET, {
          expiresIn: "7d",
        });
        return res.status(200).send({ token, user, games });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal server error');
  }
};

export const signOutUser = async (req: Request, res: Response) => {
  try{
    const _id: string = req.body.user._id;
    const token: string = req.body.token;
    const user = await User.findById(_id);
    if (!user) return res.status(422).send({ error: "Must be signed In" });
    await Blacklist.create({
      token,
      user: user._id
    });
    return res.status(200).send({message: 'Successfully signed out'});
  } catch (err) {
    res.status(500).send('Error signing out');
  }
};
