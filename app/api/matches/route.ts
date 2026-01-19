import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthUser } from "@/lib/auth-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";

// 매칭 목록 조회
export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);

    if (!authUser) {
      return errorResponse("UNAUTHORIZED", "인증이 필요합니다.", 401);
    }

    // 사용자의 활성 프로필 확인
    const userProfile = await prisma.profile.findFirst({
      where: {
        userId: authUser.userId,
        isActive: true,
      },
    });

    if (!userProfile) {
      return successResponse({ matches: [] });
    }

    // 사용자의 매칭 조회 (profile1 또는 profile2로 참여한 매칭)
    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { profile1Id: userProfile.id },
          { profile2Id: userProfile.id },
        ],
      },
      include: {
        profile1: {
          select: {
            id: true,
            nickname: true,
          },
        },
        profile2: {
          select: {
            id: true,
            nickname: true,
          },
        },
        matchRequest: {
          select: {
            id: true,
            message: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse({ matches });
  } catch (error) {
    console.error("Get matches error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}
