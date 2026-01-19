import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthUser } from "@/lib/auth-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";

// 매칭 신청
export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);

    if (!authUser) {
      return errorResponse("UNAUTHORIZED", "인증이 필요합니다.", 401);
    }

    if (authUser.isGuest) {
      return errorResponse("GUEST_NOT_ALLOWED", "게스트는 매칭 신청을 할 수 없습니다.", 403);
    }

    const body = await request.json();
    const { requesterProfileId, targetProfileId, message } = body;

    // 입력 검증
    if (!targetProfileId) {
      return errorResponse("VALIDATION_ERROR", "대상 프로필 ID는 필수입니다.");
    }

    if (!requesterProfileId) {
      return errorResponse("VALIDATION_ERROR", "신청 프로필 ID는 필수입니다.");
    }

    // 대상 프로필 확인
    const targetProfile = await prisma.profile.findUnique({
      where: { id: targetProfileId },
    });

    if (!targetProfile) {
      return errorResponse("PROFILE_NOT_FOUND", "대상 프로필을 찾을 수 없습니다.", 404);
    }

    if (!targetProfile.isActive) {
      return errorResponse("PROFILE_NOT_ACTIVE", "비활성화된 프로필입니다.", 400);
    }

    // 신청자 프로필 확인 (내가 등록한 프로필인지)
    const requesterProfile = await prisma.profile.findUnique({
      where: { id: requesterProfileId },
    });

    if (!requesterProfile) {
      return errorResponse("PROFILE_NOT_FOUND", "신청 프로필을 찾을 수 없습니다.", 404);
    }

    if (requesterProfile.registeredById !== authUser.userId) {
      return errorResponse("FORBIDDEN", "본인이 등록한 프로필만 사용할 수 있습니다.", 403);
    }

    if (!requesterProfile.isActive) {
      return errorResponse("PROFILE_NOT_ACTIVE", "비활성화된 프로필입니다.", 400);
    }

    // 같은 프로필에 신청 불가
    if (requesterProfileId === targetProfileId) {
      return errorResponse("SELF_REQUEST", "같은 프로필에 신청할 수 없습니다.", 400);
    }

    // 중복 신청 확인
    const existingRequest = await prisma.matchRequest.findUnique({
      where: {
        requesterProfileId_targetProfileId: {
          requesterProfileId: requesterProfile.id,
          targetProfileId,
        },
      },
    });

    if (existingRequest) {
      return errorResponse("DUPLICATE_REQUEST", "이미 신청한 매칭입니다.", 400);
    }

    // 매칭 신청 생성
    const matchRequest = await prisma.matchRequest.create({
      data: {
        requesterProfileId: requesterProfile.id,
        targetProfileId,
        message: message || null,
        status: "pending",
      },
      include: {
        requesterProfile: {
          select: {
            id: true,
            nickname: true,
          },
        },
        targetProfile: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });

    return successResponse({ matchRequest });
  } catch (error) {
    console.error("Create match request error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}

// 매칭 신청 목록 조회
export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthUser(request);

    if (!authUser) {
      return errorResponse("UNAUTHORIZED", "인증이 필요합니다.", 401);
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // 'sent' 또는 'received'
    const status = searchParams.get("status"); // 'pending', 'accepted', 'rejected', 'cancelled'

    // 내가 등록한 프로필 목록
    const myProfiles = await prisma.profile.findMany({
      where: {
        registeredById: authUser.userId,
        isActive: true,
      },
      select: { id: true },
    });

    if (myProfiles.length === 0) {
      return successResponse({ requests: [] });
    }

    const myProfileIds = myProfiles.map((p) => p.id);

    // 필터 조건
    const where: any = {};
    if (type === "sent") {
      where.requesterProfileId = { in: myProfileIds };
    } else if (type === "received") {
      where.targetProfileId = { in: myProfileIds };
    } else {
      // 둘 다
      where.OR = [
        { requesterProfileId: { in: myProfileIds } },
        { targetProfileId: { in: myProfileIds } },
      ];
    }

    if (status) {
      where.status = status;
    }

    const matchRequests = await prisma.matchRequest.findMany({
      where,
      include: {
        requesterProfile: {
          select: {
            id: true,
            nickname: true,
            character: true,
            birthYear: true,
            registeredBy: {
              select: {
                id: true,
                nickname: true,
              },
            },
          },
        },
        targetProfile: {
          select: {
            id: true,
            nickname: true,
            character: true,
            birthYear: true,
            registeredBy: {
              select: {
                id: true,
                nickname: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return successResponse({ requests: matchRequests });
  } catch (error) {
    console.error("Get match requests error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}
