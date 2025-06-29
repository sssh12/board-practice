// .env에서 JWT 비밀키를 읽어와 내보냅니다.
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRES_IN = "7d"; // 토큰 유효기간(7일)
