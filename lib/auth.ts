import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "buzzting-secret-key-change-in-production"
);

export interface JWTPayload {
  userId: string;
  email: string;
  isGuest?: boolean;
  [key: string]: unknown;
}

// JWT 토큰 생성
export async function createToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // 7일 유효
    .sign(JWT_SECRET);

  return token;
}

// JWT 토큰 검증
export async function verifyToken(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

// 이메일 도메인 검증 (버즈빌 이메일만 허용)
export function validateBuzzvilEmail(email: string): boolean {
  return email.endsWith("@buzzvil.com");
}

// 게스트 토큰 생성
export async function createGuestToken(): Promise<string> {
  const token = await new SignJWT({
    userId: "guest",
    email: "guest@buzzting.com",
    isGuest: true,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(JWT_SECRET);

  return token;
}
