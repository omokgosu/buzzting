"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/lib/auth-client";
import { getCharacterIcon } from "@/components/CharacterIcons";
import { useUser, useProfiles, useLogout, usePrefetchProfile } from "@/hooks/use-api";

export default function Home() {
  const router = useRouter();
  const [genderFilter, setGenderFilter] = useState<string>("");

  const { data: user, isLoading: userLoading, error: userError } = useUser();
  const { data: profilesData, isLoading: profilesLoading } = useProfiles(1, genderFilter || undefined);
  const logoutMutation = useLogout();
  const prefetchProfile = usePrefetchProfile();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }
  }, [router]);

  useEffect(() => {
    if (userError) {
      removeToken();
      router.push("/auth/login");
    }
  }, [userError, router]);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      removeToken();
      router.push("/auth/login");
    }
  };

  const profiles = profilesData?.profiles || [];
  const genderCounts = profilesData?.genderCounts || { total: 0, male: 0, female: 0 };
  const loading = userLoading || profilesLoading;

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#E8DDD4] sticky top-0 z-20">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#C4956A]">Buzzting</h1>
              <p className="text-xs text-[#A08060] mt-0.5">버즈빌 친구들 소개해드려요</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {user ? (
                <>
                  <span className="text-[#5C4A37] font-medium">{user.nickname}</span>
                  {!user.isGuest && (
                    <Link
                      href="/mypage"
                      className="px-3 py-1.5 rounded-lg bg-[#F5EDE5] text-[#8B7355] font-medium active:scale-[0.97] transition-all"
                    >
                      마이페이지
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-[#A08060] active:text-[#8B7355] transition-colors"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className="text-[#C4956A] font-medium">
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* 성별 필터 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setGenderFilter("")}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              genderFilter === "" ? "bg-[#C4956A] text-white" : "bg-[#F5EDE5] text-[#8B7355]"
            }`}
          >
            전체 {genderCounts.total > 0 && `(${genderCounts.total})`}
          </button>
          <button
            onClick={() => setGenderFilter("male")}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              genderFilter === "male" ? "bg-[#C4956A] text-white" : "bg-[#F5EDE5] text-[#8B7355]"
            }`}
          >
            남자 {genderCounts.male > 0 && `(${genderCounts.male})`}
          </button>
          <button
            onClick={() => setGenderFilter("female")}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              genderFilter === "female" ? "bg-[#C4956A] text-white" : "bg-[#F5EDE5] text-[#8B7355]"
            }`}
          >
            여자 {genderCounts.female > 0 && `(${genderCounts.female})`}
          </button>
        </div>

        {/* 프로필 목록 */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#A08060]">로딩 중...</p>
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#A08060]">등록된 프로필이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {profiles.map((profile) => (
              <Link
                key={profile.id}
                href={`/profile/${profile.id}`}
                className={`group bg-white rounded-2xl shadow-sm border overflow-hidden active:scale-[0.98] transition-all hover:shadow-md ${
                  profile.instagramUrl
                    ? "border-pink-400 border-[1.5px]"
                    : "border-[#E8DDD4]"
                }`}
                onMouseEnter={() => prefetchProfile(profile.id)}
                onTouchStart={() => prefetchProfile(profile.id)}
              >
                {/* 캐릭터 영역 */}
                <div className="bg-gradient-to-b from-[#FDFBF8] to-[#F8F4EF] pt-6 pb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center">
                    {(() => {
                      const CharIcon = getCharacterIcon(profile.character);
                      return CharIcon ? (
                        <CharIcon size={52} />
                      ) : (
                        <span className="text-2xl text-[#C4956A]">{profile.nickname?.charAt(0) || "?"}</span>
                      );
                    })()}
                  </div>
                </div>

                {/* 정보 영역 */}
                <div className="p-4">
                  {/* 닉네임 & 년생 */}
                  <div className="text-center mb-3">
                    <h2 className="text-base font-bold text-[#5C4A37]">{profile.nickname}</h2>
                    <p className="text-sm text-[#8B7355] mt-0.5">
                      {profile.birthYear ? `${profile.birthYear}년생` : ""}
                      {profile.birthYear && profile.gender && " · "}
                      {profile.gender === "male" ? "남자" : profile.gender === "female" ? "여자" : ""}
                    </p>
                  </div>

                  {/* 직장 | MBTI | 키 */}
                  <div className="flex justify-center gap-1 flex-wrap mb-3">
                    {profile.job && (
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#F5EDE5] text-[#8B7355]">
                        {profile.job}
                      </span>
                    )}
                    {profile.mbti && (
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#C4956A]/10 text-[#C4956A] font-medium">
                        {profile.mbti}
                      </span>
                    )}
                    {profile.height && (
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#F5EDE5] text-[#8B7355]">
                        {profile.height}cm
                      </span>
                    )}
                  </div>

                  {/* 친구 소개 */}
                  {profile.bio && (
                    <p className="text-xs text-[#A08060] text-center line-clamp-2 leading-relaxed">
                      "{profile.bio}"
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* 프로필 등록 플로팅 버튼 - guest가 아닌 경우에만 표시 */}
      {user && !user.isGuest && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[500px] px-4 pointer-events-none">
          <div className="flex justify-end pointer-events-auto">
            <Link
              href="/profiles/new"
              className="px-4 py-2.5 bg-[#C4956A] text-white text-sm font-medium rounded-full shadow-lg active:scale-95 transition-all"
            >
              + 프로필 등록
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
