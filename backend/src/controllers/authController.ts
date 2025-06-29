import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";

// 회원가입
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "모든 필드를 입력해 주세요." });
      return;
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res
        .status(409)
        .json({ message: "이미 존재하는 이메일 또는 아이디입니다." });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({
      message: "회원가입 성공",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "서버 에러", error: error?.message });
  }
};

// 로그인
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "모든 필드를 입력해 주세요." });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(401)
        .json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(401)
        .json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
      return;
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    res.status(200).json({
      message: "로그인 성공",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "서버 에러", error: error?.message });
  }
};
