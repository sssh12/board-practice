import mongoose from "mongoose";

// .env 파일에서 MongoDB 접속 주소(MONGODB_URI)를 가져옵니다.
const MONGODB_URI = process.env.MONGODB_URI as string;

/**
 * MongoDB와 연결하는 함수입니다.
 * mongoose.connect()는 비동기 함수이므로 async/await를 사용합니다.
 */
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB 연결 성공");
  } catch (error) {
    console.error("❌ MongoDB 연결 실패:", error);
    // 연결 실패 시 프로세스 종료
    process.exit(1);
  }
};
