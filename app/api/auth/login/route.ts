import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-response";
import { createToken, validateBuzzvilEmail } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return errorResponse("VALIDATION_ERROR", "이메일은 필수입니다.");
    }

    if (!validateBuzzvilEmail(email)) {
      return errorResponse("INVALID_EMAIL_DOMAIN", "버즈빌 이메일(@buzzvil.com)만 사용 가능합니다.");
    }

    // 사용자 조회
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse("USER_NOT_FOUND", "등록되지 않은 이메일입니다.");
    }

    // JWT 토큰 생성
    const token = await createToken({
      userId: user.id,
      email: user.email,
    });

    return successResponse({
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        name: user.name,
        department: user.department,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}
