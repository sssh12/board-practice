import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

// .env 파일의 환경변수를 process.env로 등록
dotenv.config();

const app: Application = express();

// 미들웨어 등록
app.use(cors()); // 모든 도메인의 요청 허용 (CORS 정책 해결)
app.use(express.json()); // JSON 형식의 요청 본문(body) 해석

// 간단한 API 상태 확인용 엔드포인트
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ message: "API 서버 정상 작동 중!" });
});

// 1. Auth 라우터 등록
app.use("/api/auth", authRoutes);

// (추후) 에러 처리 미들웨어 위치 예시
// import { errorHandler } from './middlewares/errorMiddleware';
// app.use(errorHandler);

export default app;
