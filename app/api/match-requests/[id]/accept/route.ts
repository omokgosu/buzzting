import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthUser } from "@/lib/auth-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";

// 매칭 신청 수락
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await getAuthUser(request);

    if (!authUser) {
      return errorResponse("UNAUTHORIZED", "인증이 필요합니다.", 401);
    }

    // 매칭 신청 조회
    const matchRequest = await prisma.matchRequest.findUnique({
      where: { id },
      include: {
        targetProfile: true,
        requesterProfile: true,
      },
    });

    if (!matchRequest) {
      return errorResponse("MATCH_REQUEST_NOT_FOUND", "매칭 신청을 찾을 수 없습니다.", 404);
    }

    // 권한 확인: 신청 대상 프로필의 등록자만 수락 가능
    if (matchRequest.targetProfile.registeredById !== authUser.userId) {
      return errorResponse("FORBIDDEN", "매칭 신청을 수락할 권한이 없습니다.", 403);
    }

    if (matchRequest.status !== "pending") {
      return errorResponse("INVALID_STATUS", "이미 처리된 매칭 신청입니다.", 400);
    }

    // 트랜잭션으로 매칭 신청 수락 및 매칭 생성
    const result = await prisma.$transaction(async (tx) => {
      // 매칭 신청 상태 업데이트
      const updatedRequest = await tx.matchRequest.update({
        where: { id },
        data: {
          status: "accepted",
          respondedAt: new Date(),
        },
      });

      // 매칭 생성
      const match = await tx.match.create({
        data: {
          matchRequestId: id,
          profile1Id: matchRequest.requesterProfileId,
          profile2Id: matchRequest.targetProfileId,
          status: "active",
        },
      });

      return { matchRequest: updatedRequest, match };
    });

    // 소개자 정보 조회
    const requesterProfile = await prisma.profile.findUnique({
      where: { id: matchRequest.requesterProfileId },
      include: {
        registeredBy: {
          select: { nickname: true, email: true },
        },
        user: {
          select: { nickname: true, email: true },
        },
      },
    });

    const targetProfile = await prisma.profile.findUnique({
      where: { id: matchRequest.targetProfileId },
      include: {
        registeredBy: {
          select: { nickname: true, email: true },
        },
        user: {
          select: { nickname: true, email: true },
        },
      },
    });

    return successResponse({
      ...result,
      requesterProfile,
      targetProfile,
    });
  } catch (error) {
    console.error("Accept match request error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}
