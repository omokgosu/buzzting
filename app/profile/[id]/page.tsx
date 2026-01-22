"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import html2canvas from "html2canvas";
import { profileApi, matchApi, authApi, myApi } from "@/lib/api-client";
import { getToken } from "@/lib/auth-client";
import { getCharacterIcon } from "@/components/CharacterIcons";

export default function ProfileDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [myProfiles, setMyProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestStep, setRequestStep] = useState<"select" | "message">("select");
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const profileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }

    loadProfile();
    loadUser();
    loadMyProfiles();
  }, [id, router]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await profileApi.get(id);
      if (response.success && response.data) {
        setProfile(response.data.profile);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      router.push("/home");
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
      console.error("Failed to load user:", error);
    }
  };

  const loadMyProfiles = async () => {
    try {
      const response = await myApi.profiles();
      if (response.success && response.data) {
        setMyProfiles(response.data.profiles);
      }
    } catch (error) {
      console.error("Failed to load my profiles:", error);
    }
  };

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedProfileId) {
      setError("신청할 프로필을 선택해주세요.");
      return;
    }

    setRequesting(true);

    try {
      const response = await matchApi.request(selectedProfileId, id, message || undefined);
      if (response.success) {
        setShowRequestForm(false);
        setMessage("");
        setSelectedProfileId("");
        setRequestStep("select");
        alert("매칭 신청이 완료되었습니다!");
        router.push("/home");
      } else {
        setError(response.error?.message || "매칭 신청에 실패했습니다.");
      }
    } catch (error) {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setRequesting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 이 프로필을 삭제하시겠습니까?")) {
      return;
    }

    setDeleting(true);
    try {
      const response = await profileApi.delete(id);
      if (response.success) {
        alert("프로필이 삭제되었습니다.");
        router.push("/home");
      } else {
        alert(response.error?.message || "삭제에 실패했습니다.");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!profileCardRef.current) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(profileCardRef.current, {
        backgroundColor: "#FAF8F3",
        scale: 2,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `buzzting-${profile.nickname}-profile.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Failed to download image:", error);
      alert("이미지 다운로드에 실패했습니다.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center">
        <p className="text-[#A08060]">로딩 중...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center">
        <p className="text-[#A08060]">프로필을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const isOwner = user && profile.userId === user.id;
  const isRegistrar = user && profile.registeredById === user.id;
  const canEdit = isOwner || isRegistrar;
  const canDelete = isRegistrar;

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#E8DDD4] sticky top-0 z-20">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/home" className="text-xl font-bold text-[#C4956A]">
              Buzzting
            </Link>
            <Link href="/home" className="text-sm text-[#A08060]">
              ← 목록으로
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-24">
        {/* 이미지 다운로드 안내 */}
        <div className="mb-4 p-4 bg-[#FFF8F0] rounded-xl border border-[#E8DDD4] flex items-center justify-between gap-3">
          <p className="text-sm text-[#8B7355]">
            📸 프로필을 이미지로 저장해서 친구에게 전해주세요!
          </p>
          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="px-4 py-2 text-sm rounded-lg bg-[#C4956A] text-white font-medium whitespace-nowrap active:scale-95 transition-all disabled:opacity-50"
          >
            {downloading ? "저장 중..." : "저장하기"}
          </button>
        </div>

        <div ref={profileCardRef} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#E8DDD4]">
          {/* 캐릭터 & 닉네임 */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-[#F5EDE5] flex items-center justify-center flex-shrink-0">
              {(() => {
                const CharIcon = getCharacterIcon(profile.character);
                return CharIcon ? (
                  <CharIcon size={52} />
                ) : (
                  <span className="text-3xl text-[#C4956A]">{profile.nickname?.charAt(0) || "?"}</span>
                );
              })()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#5C4A37]">{profile.nickname}</h1>
                {profile.gender && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    profile.gender === "male"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-pink-100 text-pink-600"
                  }`}>
                    {profile.gender === "male" ? "남자" : "여자"}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#A08060] mt-1">
                {[
                  profile.birthYear && `${profile.birthYear}년생`,
                  profile.location,
                  profile.job
                ].filter(Boolean).join(" · ")}
              </p>
              {profile.registeredBy && (
                <p className="text-xs text-[#C4956A] mt-1">
                  {profile.registeredBy.nickname}님이 소개한 친구
                </p>
              )}
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                기본 정보
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {profile.gender && (
                  <div>
                    <p className="text-sm text-[#A08060] mb-1">성별</p>
                    <p className="text-[#5C4A37] font-medium">
                      {profile.gender === "male" ? "남자" : profile.gender === "female" ? "여자" : profile.gender}
                    </p>
                  </div>
                )}
                {profile.height && (
                  <div>
                    <p className="text-sm text-[#A08060] mb-1">키</p>
                    <p className="text-[#5C4A37] font-medium">{profile.height}cm</p>
                  </div>
                )}
                {profile.mbti && (
                  <div>
                    <p className="text-sm text-[#A08060] mb-1">MBTI</p>
                    <p className="text-[#5C4A37] font-medium">{profile.mbti}</p>
                  </div>
                )}
                {profile.smoking && (
                  <div>
                    <p className="text-sm text-[#A08060] mb-1">흡연</p>
                    <p className="text-[#5C4A37] font-medium">{profile.smoking}</p>
                  </div>
                )}
                {profile.drinking && (
                  <div>
                    <p className="text-sm text-[#A08060] mb-1">음주</p>
                    <p className="text-[#5C4A37] font-medium">{profile.drinking}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 친구 소개 */}
            {profile.bio && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                  친구 소개
                </h2>
                <p className="text-[#5C4A37] whitespace-pre-wrap leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {/* 이상형 */}
            {profile.idealTypes && profile.idealTypes.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                  이런 사람을 만나고 싶어요
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.idealTypes.map((type: string, idx: number) => (
                    <span key={idx} className="px-3 py-2 bg-[#C4956A] text-white text-sm rounded-full">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 데이트 스타일 */}
            {profile.dateStyles && profile.dateStyles.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                  선호하는 데이트 스타일
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.dateStyles.map((style: string, idx: number) => (
                    <span key={idx} className="px-3 py-2 bg-[#C4956A] text-white text-sm rounded-full">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 관심사 */}
            {profile.interests && profile.interests.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                  관심사
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest: string, idx: number) => (
                    <span key={idx} className="px-3 py-2 bg-[#C4956A] text-white text-sm rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 연애 스타일 */}
            {profile.datingStyles && profile.datingStyles.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                  연애 스타일
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.datingStyles.map((style: string, idx: number) => (
                    <span key={idx} className="px-3 py-2 bg-[#C4956A] text-white text-sm rounded-full">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 연락 스타일 */}
            {profile.contactStyles && profile.contactStyles.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                  연락 스타일
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.contactStyles.map((style: string, idx: number) => (
                    <span key={idx} className="px-3 py-2 bg-[#C4956A] text-white text-sm rounded-full">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 연락 선호 방식 */}
            {profile.contactPreference && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                  연락 선호 방식
                </h2>
                <span className="px-3 py-2 bg-[#C4956A] text-white text-sm rounded-full">
                  {profile.contactPreference}
                </span>
              </div>
            )}
          </div>

          {/* 매칭 신청 / 수정 / 삭제 버튼 */}
          <div className="mt-8 space-y-3">
            {!canEdit && user && (
              <>
                {!showRequestForm ? (
                  <button
                    onClick={() => {
                      if (myProfiles.length === 0) {
                        alert("먼저 프로필을 등록해주세요.");
                        router.push("/profiles/new");
                        return;
                      }
                      setShowRequestForm(true);
                    }}
                    className="w-full px-6 py-3 rounded-xl text-white bg-gradient-to-r from-[#C4956A] to-[#B8A080] font-medium shadow-md active:scale-[0.97] transition-all"
                  >
                    매칭 신청하기
                  </button>
                ) : (
                  <div className="space-y-4">
                    {requestStep === "select" ? (
                      <>
                        <p className="text-sm font-medium text-[#5C4A37]">
                          어떤 친구로 신청할까요?
                        </p>
                        <div className="space-y-2">
                          {myProfiles.map((p) => {
                            const CharIcon = getCharacterIcon(p.character);
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => {
                                  setSelectedProfileId(p.id);
                                  setRequestStep("message");
                                }}
                                className="w-full flex items-center gap-3 p-3 rounded-xl border border-[#E0D4C8] bg-white hover:border-[#C4956A] active:scale-[0.98] transition-all"
                              >
                                <div className="w-12 h-12 rounded-xl bg-[#F5EDE5] flex items-center justify-center flex-shrink-0">
                                  {CharIcon ? (
                                    <CharIcon size={32} />
                                  ) : (
                                    <span className="text-lg text-[#C4956A]">{p.nickname?.charAt(0)}</span>
                                  )}
                                </div>
                                <div className="text-left">
                                  <p className="font-medium text-[#5C4A37]">{p.nickname}</p>
                                  <p className="text-xs text-[#A08060]">
                                    {[p.birthYear && `${p.birthYear}년생`, p.location].filter(Boolean).join(" · ")}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setShowRequestForm(false);
                            setSelectedProfileId("");
                            setError("");
                          }}
                          className="w-full px-6 py-3 rounded-xl text-[#8B7355] bg-[#F5EDE5] font-medium active:scale-[0.97] transition-all"
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <form onSubmit={handleRequest} className="space-y-4">
                        <div className="p-3 bg-[#F5EDE5] rounded-xl">
                          <p className="text-xs text-[#A08060] mb-1">신청 프로필</p>
                          <p className="font-medium text-[#5C4A37]">
                            {myProfiles.find((p) => p.id === selectedProfileId)?.nickname}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#8B7355] mb-1">
                            메시지 (선택)
                          </label>
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-[#E0D4C8] rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] text-[#5C4A37] placeholder:text-[#B8A090]"
                            placeholder="안녕하세요! 관심 있어요"
                          />
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={requesting}
                            className="flex-1 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-[#C4956A] to-[#B8A080] font-medium shadow-md disabled:opacity-50 active:scale-[0.97] transition-all"
                          >
                            {requesting ? "신청 중..." : "신청하기"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setRequestStep("select");
                              setSelectedProfileId("");
                              setMessage("");
                              setError("");
                            }}
                            className="flex-1 px-6 py-3 rounded-xl text-[#8B7355] bg-[#F5EDE5] font-medium active:scale-[0.97] transition-all"
                          >
                            이전
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </>
            )}

            {canEdit && (
              <Link
                href={`/profiles/edit/${profile.id}`}
                className="w-full block text-center px-6 py-3 rounded-xl text-white bg-gradient-to-r from-[#A08060] to-[#8B7355] font-medium shadow-md active:scale-[0.97] transition-all"
              >
                프로필 수정
              </Link>
            )}

            {canDelete && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full px-6 py-3 rounded-xl text-red-500 bg-red-50 border border-red-200 font-medium active:scale-[0.97] transition-all disabled:opacity-50"
              >
                {deleting ? "삭제 중..." : "프로필 삭제"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
