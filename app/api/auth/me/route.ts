import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthUser } from "@/lib/auth-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const payload = await getAuthUser(request);

    if (!payload) {
      return errorResponse("UNAUTHORIZED", "인증이 필요합니다.", 401);
    }

    // guest 사용자인 경우 DB 조회 없이 직접 반환
    if (payload.isGuest) {
      return successResponse({
        user: {
          id: "guest",
          email: "guest@buzzting.com",
          nickname: "게스트",
          isGuest: true,
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        nickname: true,
        name: true,
        department: true,
        emailVerified: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return errorResponse("USER_NOT_FOUND", "사용자를 찾을 수 없습니다.", 404);
    }

    return successResponse({ user });
  } catch (error) {
    console.error("Get me error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}
