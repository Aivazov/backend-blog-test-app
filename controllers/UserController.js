import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const signup = async (req, res) => {
  try {
    const password = req.body.passwordHash;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'whateverYouWant',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Registration failure',
    });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'The user was not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.passwordHash,
      user._doc.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Invalid login or password',
      });
    }

    const token = jwt.sign({ _id: user._id }, 'whateverYouWant', {
      expiresIn: '30d',
    });

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Authorization failed',
    });
  }
};

export const userInfo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    const token = req.token;

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
    }

    const { passwordHash, ...userData } = user._doc;
    res.json({
      userData,
      token,
    });
  } catch (error) {}
};
