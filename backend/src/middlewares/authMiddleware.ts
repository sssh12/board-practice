import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt";

// 사용자 정보 타입 확장 (Express Request에 user 속성 추가)
export interface AuthRequest extends Request {
  user?: { userId: string; username: string };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  // 토큰이 없으면 401 반환
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "인증 토큰이 필요합니다." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      username: string;
    };
    req.user = { userId: decoded.userId, username: decoded.username };
    next();
  } catch (err) {
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    return;
  }
};
