import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthUser } from "@/lib/auth-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";

// 내가 등록한 프로필 목록 조회
export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);

    if (!authUser) {
      return errorResponse("UNAUTHORIZED", "인증이 필요합니다.", 401);
    }

    const profiles = await prisma.profile.findMany({
      where: {
        registeredById: authUser.userId,
        isActive: true,
      },
      select: {
        id: true,
        nickname: true,
        character: true,
        birthYear: true,
        location: true,
        job: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            nickname: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse({ profiles });
  } catch (error) {
    console.error("Get my profiles error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}
