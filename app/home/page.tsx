"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { profileApi, authApi } from "@/lib/api-client";
import { getToken, removeToken } from "@/lib/auth-client";
import { getCharacterIcon } from "@/components/CharacterIcons";

export default function Home() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [genderCounts, setGenderCounts] = useState<{ total: number; male: number; female: number }>({ total: 0, male: 0, female: 0 });

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }

    loadProfiles();
    loadUser();
  }, [page, genderFilter, router]);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const response = await profileApi.list(page, 20, genderFilter || undefined);
      if (response.success && response.data) {
        setProfiles(response.data.profiles);
        if (response.data.genderCounts) {
          setGenderCounts(response.data.genderCounts);
        }
      }
    } catch (error) {
      console.error("Failed to load profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUser = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await authApi.me();
      if (response.success && response.data) {
        setUser(response.data.user);
      }
    } catch (error) {
      removeToken();
      router.push("/auth/login");
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      removeToken();
      router.push("/auth/login");
    }
  };

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
                  <Link
                    href="/mypage"
                    className="px-3 py-1.5 rounded-lg bg-[#F5EDE5] text-[#8B7355] font-medium active:scale-[0.97] transition-all"
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-[#A08060] active:text-[#8B7355] transition-colors"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-[#C4956A] font-medium"
                >
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
              genderFilter === ""
                ? "bg-[#C4956A] text-white"
                : "bg-[#F5EDE5] text-[#8B7355]"
            }`}
          >
            전체 {genderCounts.total > 0 && `(${genderCounts.total})`}
          </button>
          <button
            onClick={() => setGenderFilter("male")}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              genderFilter === "male"
                ? "bg-[#C4956A] text-white"
                : "bg-[#F5EDE5] text-[#8B7355]"
            }`}
          >
            남자 {genderCounts.male > 0 && `(${genderCounts.male})`}
          </button>
          <button
            onClick={() => setGenderFilter("female")}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              genderFilter === "female"
                ? "bg-[#C4956A] text-white"
                : "bg-[#F5EDE5] text-[#8B7355]"
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
          <div className="grid grid-cols-1 gap-4">
            {profiles.map((profile) => (
              <Link
                key={profile.id}
                href={`/profile/${profile.id}`}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-[#E8DDD4] p-4 active:scale-[0.98] transition-all"
              >
                <div className="flex gap-4">
                  {/* 프로필 아바타 */}
                  <div className="w-16 h-16 rounded-full bg-[#F5EDE5] flex items-center justify-center border-2 border-[#E8DDD4] flex-shrink-0">
                    {(() => {
                      const CharIcon = getCharacterIcon(profile.character);
                      return CharIcon ? (
                        <CharIcon size={44} />
                      ) : (
                        <span className="text-2xl text-[#C4956A]">{profile.nickname?.charAt(0) || "?"}</span>
                      );
                    })()}
                  </div>

                  {/* 프로필 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-[#5C4A37]">{profile.nickname}</h2>
                      {profile.mbti && (
                        <span className="text-xs px-2 py-0.5 bg-[#F5EDE5] text-[#C4956A] rounded-full">
                          {profile.mbti}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 text-xs text-[#8B7355] mb-2">
                      {profile.birthYear && <span>{profile.birthYear}년생</span>}
                      {profile.height && <span>· {profile.height}cm</span>}
                      {profile.location && <span>· {profile.location}</span>}
                      {profile.job && <span>· {profile.job}</span>}
                    </div>

                    {profile.bio && (
                      <p className="text-xs text-[#8B7355] line-clamp-2 mb-2">{profile.bio}</p>
                    )}

                    {profile.interests && profile.interests.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {profile.interests.slice(0, 4).map((interest: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-[#F5EDE5] text-[#C4956A] text-xs rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                        {profile.interests.length > 4 && (
                          <span className="px-2 py-0.5 text-[#A08060] text-xs">
                            +{profile.interests.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* 프로필 등록 플로팅 버튼 */}
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
    </div>
  );
}
