import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthUser } from "@/lib/auth-middleware";
import { successResponse, errorResponse } from "@/lib/api-response";

// 프로필 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await getAuthUser(request);

    const profile = await prisma.profile.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        registeredById: true,
        character: true,
        nickname: true,
        gender: true,
        birthYear: true,
        bio: true,
        height: true,
        mbti: true,
        location: true,
        job: true,
        smoking: true,
        drinking: true,
        interests: true,
        idealTypes: true,
        dateStyles: true,
        datingStyles: true,
        contactStyles: true,
        contactPreference: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        registeredBy: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });

    if (!profile) {
      return errorResponse("PROFILE_NOT_FOUND", "프로필을 찾을 수 없습니다.", 404);
    }

    // 연락처 정보는 매칭 성사 시에만 공개 (일단은 모든 인증 사용자에게 공개)
    // TODO: 매칭 성사 여부 확인 로직 추가

    return successResponse({ profile });
  } catch (error) {
    console.error("Get profile error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}

// 프로필 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await getAuthUser(request);

    if (!authUser) {
      return errorResponse("UNAUTHORIZED", "인증이 필요합니다.", 401);
    }

    const profile = await prisma.profile.findUnique({
      where: { id },
    });

    if (!profile) {
      return errorResponse("PROFILE_NOT_FOUND", "프로필을 찾을 수 없습니다.", 404);
    }

    // 권한 확인: 본인(userId) 또는 등록자(registeredById)만 수정 가능
    if (profile.userId !== authUser.userId && profile.registeredById !== authUser.userId) {
      return errorResponse("FORBIDDEN", "프로필을 수정할 권한이 없습니다.", 403);
    }

    const body = await request.json();
    const {
      character,
      nickname,
      gender,
      birthYear,
      bio,
      height,
      mbti,
      location,
      job,
      smoking,
      drinking,
      interests,
      idealTypes,
      dateStyles,
      datingStyles,
      contactStyles,
      contactPreference,
    } = body;

    const updatedProfile = await prisma.profile.update({
      where: { id },
      data: {
        ...(character !== undefined && { character }),
        ...(nickname !== undefined && { nickname }),
        ...(gender !== undefined && { gender }),
        ...(birthYear !== undefined && { birthYear }),
        ...(bio !== undefined && { bio }),
        ...(height !== undefined && { height }),
        ...(mbti !== undefined && { mbti }),
        ...(location !== undefined && { location }),
        ...(job !== undefined && { job }),
        ...(smoking !== undefined && { smoking }),
        ...(drinking !== undefined && { drinking }),
        ...(interests !== undefined && { interests }),
        ...(idealTypes !== undefined && { idealTypes }),
        ...(dateStyles !== undefined && { dateStyles }),
        ...(datingStyles !== undefined && { datingStyles }),
        ...(contactStyles !== undefined && { contactStyles }),
        ...(contactPreference !== undefined && { contactPreference }),
      },
    });

    return successResponse({ profile: updatedProfile });
  } catch (error) {
    console.error("Update profile error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}

// 프로필 삭제 (비활성화)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await getAuthUser(request);

    if (!authUser) {
      return errorResponse("UNAUTHORIZED", "인증이 필요합니다.", 401);
    }

    const profile = await prisma.profile.findUnique({
      where: { id },
    });

    if (!profile) {
      return errorResponse("PROFILE_NOT_FOUND", "프로필을 찾을 수 없습니다.", 404);
    }

    // 권한 확인: 본인 또는 등록자만 삭제 가능
    if (profile.userId !== authUser.userId && profile.registeredById !== authUser.userId) {
      return errorResponse("FORBIDDEN", "프로필을 삭제할 권한이 없습니다.", 403);
    }

    // 실제 삭제가 아닌 is_active = false로 변경
    await prisma.profile.update({
      where: { id },
      data: { isActive: false },
    });

    return successResponse({ message: "프로필이 삭제되었습니다." });
  } catch (error) {
    console.error("Delete profile error:", error);
    return errorResponse("INTERNAL_ERROR", "서버 오류가 발생했습니다.", 500);
  }
}
