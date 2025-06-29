import mongoose, { Document, Schema } from "mongoose";

// 1. User 타입 인터페이스 정의 (TypeScript의 타입 체크에 사용)
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// 2. 실제 MongoDB에 저장될 User 스키마 정의
const userSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// 3. 모델 생성 및 내보내기
export default mongoose.model<IUser>("User", userSchema);
