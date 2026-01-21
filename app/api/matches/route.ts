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

    // 내가 등록한 프로필들 조회
    const myProfiles = await prisma.profile.findMany({
      where: {
        registeredById: authUser.userId,
        isActive: true,
      },
      select: { id: true },
    });

    const myProfileIds = myProfiles.map((p) => p.id);

    // 내가 등록한 프로필이 참여한 매칭 조회
    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { profile1Id: { in: myProfileIds } },
          { profile2Id: { in: myProfileIds } },
        ],
      },
      include: {
        profile1: {
          select: {
            id: true,
            nickname: true,
            character: true,
            registeredBy: {
              select: { nickname: true, email: true },
            },
            user: {
              select: { nickname: true, email: true },
            },
          },
        },
        profile2: {
          select: {
            id: true,
            nickname: true,
            character: true,
            registeredBy: {
              select: { nickname: true, email: true },
            },
            user: {
              select: { nickname: true, email: true },
            },
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
