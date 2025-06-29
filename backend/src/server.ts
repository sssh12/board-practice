import app from "./app";
import { connectDB } from "./config/db";

// .env 파일에서 포트 번호를 가져오고, 없으면 5000번 사용
const PORT = process.env.PORT || 5000;

// 서버 실행 함수
const startServer = async () => {
  // DB 먼저 연결
  await connectDB();

  // Express 서버 시작
  app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
  });
};

// startServer 함수 실행
startServer();
