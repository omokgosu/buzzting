"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { myApi, matchApi } from "@/lib/api-client";
import { getToken } from "@/lib/auth-client";
import { getCharacterIcon } from "@/components/CharacterIcons";

type Tab = "profiles" | "received" | "sent";

export default function MyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("profiles");
  const [profiles, setProfiles] = useState<any[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<any[]>([]);
  const [sentRequests, setSentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }

    loadData();
  }, [router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [profilesRes, receivedRes, sentRes] = await Promise.all([
        myApi.profiles(),
        matchApi.list("received"),
        matchApi.list("sent"),
      ]);

      if (profilesRes.success && profilesRes.data) {
        setProfiles(profilesRes.data.profiles);
      }
      if (receivedRes.success && receivedRes.data) {
        setReceivedRequests(receivedRes.data.requests);
      }
      if (sentRes.success && sentRes.data) {
        setSentRequests(sentRes.data.requests);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId: string) => {
    if (!confirm("이 매칭 신청을 승인하시겠습니까?")) return;

    setProcessing(requestId);
    try {
      const response = await matchApi.accept(requestId);
      if (response.success) {
        alert("매칭이 성사되었습니다!");
        loadData();
      } else {
        alert(response.error?.message || "승인에 실패했습니다.");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다.");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (requestId: string) => {
    if (!confirm("이 매칭 신청을 반려하시겠습니까?")) return;

    setProcessing(requestId);
    try {
      const response = await matchApi.reject(requestId);
      if (response.success) {
        alert("매칭 신청을 반려했습니다.");
        loadData();
      } else {
        alert(response.error?.message || "반려에 실패했습니다.");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다.");
    } finally {
      setProcessing(null);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "대기중";
      case "accepted":
        return "승인됨";
      case "rejected":
        return "반려됨";
      case "cancelled":
        return "취소됨";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "cancelled":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const pendingReceivedCount = receivedRequests.filter((r) => r.status === "pending").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center">
        <p className="text-[#A08060]">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#E8DDD4] sticky top-0 z-20">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/home" className="text-xl font-bold text-[#C4956A]">
              Buzzting
            </Link>
            <Link href="/home" className="text-sm text-[#A08060]">
              ← 홈으로
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-24">
        <h1 className="text-xl font-bold text-[#5C4A37] mb-4">마이페이지</h1>

        {/* 탭 메뉴 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("profiles")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "profiles"
                ? "bg-[#C4956A] text-white"
                : "bg-[#F5EDE5] text-[#8B7355]"
            }`}
          >
            내 프로필 ({profiles.length})
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
              activeTab === "received"
                ? "bg-[#C4956A] text-white"
                : "bg-[#F5EDE5] text-[#8B7355]"
            }`}
          >
            받은 신청
            {pendingReceivedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {pendingReceivedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "sent"
                ? "bg-[#C4956A] text-white"
                : "bg-[#F5EDE5] text-[#8B7355]"
            }`}
          >
            보낸 신청
          </button>
        </div>

        {/* 내 프로필 탭 */}
        {activeTab === "profiles" && (
          <div className="space-y-3">
            {profiles.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center">
                <p className="text-[#A08060] mb-4">아직 등록한 프로필이 없어요</p>
                <Link
                  href="/profiles/new"
                  className="inline-block px-6 py-2 rounded-xl bg-[#C4956A] text-white font-medium"
                >
                  친구 소개하기
                </Link>
              </div>
            ) : (
              <>
                {profiles.map((profile) => {
                  const CharIcon = getCharacterIcon(profile.character);
                  return (
                    <Link
                      key={profile.id}
                      href={`/profile/${profile.id}`}
                      className="block bg-white rounded-2xl p-4 border border-[#E8DDD4]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-[#F5EDE5] flex items-center justify-center flex-shrink-0">
                          {CharIcon ? (
                            <CharIcon size={36} />
                          ) : (
                            <span className="text-xl text-[#C4956A]">{profile.nickname?.charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#5C4A37]">{profile.nickname}</p>
                          <p className="text-sm text-[#A08060]">
                            {[profile.birthYear && `${profile.birthYear}년생`, profile.location, profile.job]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        </div>
                        <span className="text-[#A08060]">→</span>
                      </div>
                    </Link>
                  );
                })}
                <Link
                  href="/profiles/new"
                  className="block bg-[#F5EDE5] rounded-2xl p-4 text-center text-[#8B7355] font-medium border-2 border-dashed border-[#E0D4C8]"
                >
                  + 친구 추가로 소개하기
                </Link>
              </>
            )}
          </div>
        )}

        {/* 받은 신청 탭 */}
        {activeTab === "received" && (
          <div className="space-y-3">
            {receivedRequests.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center">
                <p className="text-[#A08060]">받은 매칭 신청이 없어요</p>
              </div>
            ) : (
              receivedRequests.map((request) => {
                const RequesterIcon = getCharacterIcon(request.requesterProfile?.character);
                const TargetIcon = getCharacterIcon(request.targetProfile?.character);
                return (
                  <div
                    key={request.id}
                    className="bg-white rounded-2xl p-4 border border-[#E8DDD4]"
                  >
                    {/* 신청 정보 */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-[#F5EDE5] flex items-center justify-center">
                          {RequesterIcon ? <RequesterIcon size={24} /> : <span className="text-sm text-[#C4956A]">{request.requesterProfile?.nickname?.charAt(0)}</span>}
                        </div>
                        <div>
                          <p className="font-medium text-[#5C4A37] text-sm">{request.requesterProfile?.nickname}</p>
                          <p className="text-xs text-[#A08060]">{request.requesterProfile?.registeredBy?.nickname}님이 소개</p>
                        </div>
                      </div>
                      <span className="text-[#C4956A]">→</span>
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-[#F5EDE5] flex items-center justify-center">
                          {TargetIcon ? <TargetIcon size={24} /> : <span className="text-sm text-[#C4956A]">{request.targetProfile?.nickname?.charAt(0)}</span>}
                        </div>
                        <div>
                          <p className="font-medium text-[#5C4A37] text-sm">{request.targetProfile?.nickname}</p>
                          <p className="text-xs text-[#A08060]">내가 소개한 친구</p>
                        </div>
                      </div>
                    </div>

                    {/* 메시지 */}
                    {request.message && (
                      <p className="text-sm text-[#8B7355] bg-[#FAF8F3] rounded-lg p-3 mb-3">
                        "{request.message}"
                      </p>
                    )}

                    {/* 상태 / 버튼 */}
                    {request.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(request.id)}
                          disabled={processing === request.id}
                          className="flex-1 py-2 rounded-xl bg-[#C4956A] text-white text-sm font-medium disabled:opacity-50"
                        >
                          승인
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          disabled={processing === request.id}
                          className="flex-1 py-2 rounded-xl bg-[#F5EDE5] text-[#8B7355] text-sm font-medium disabled:opacity-50"
                        >
                          반려
                        </button>
                      </div>
                    ) : (
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* 보낸 신청 탭 */}
        {activeTab === "sent" && (
          <div className="space-y-3">
            {sentRequests.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center">
                <p className="text-[#A08060]">보낸 매칭 신청이 없어요</p>
              </div>
            ) : (
              sentRequests.map((request) => {
                const RequesterIcon = getCharacterIcon(request.requesterProfile?.character);
                const TargetIcon = getCharacterIcon(request.targetProfile?.character);
                return (
                  <div
                    key={request.id}
                    className="bg-white rounded-2xl p-4 border border-[#E8DDD4]"
                  >
                    {/* 신청 정보 */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-[#F5EDE5] flex items-center justify-center">
                          {RequesterIcon ? <RequesterIcon size={24} /> : <span className="text-sm text-[#C4956A]">{request.requesterProfile?.nickname?.charAt(0)}</span>}
                        </div>
                        <div>
                          <p className="font-medium text-[#5C4A37] text-sm">{request.requesterProfile?.nickname}</p>
                          <p className="text-xs text-[#A08060]">내가 소개한 친구</p>
                        </div>
                      </div>
                      <span className="text-[#C4956A]">→</span>
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-[#F5EDE5] flex items-center justify-center">
                          {TargetIcon ? <TargetIcon size={24} /> : <span className="text-sm text-[#C4956A]">{request.targetProfile?.nickname?.charAt(0)}</span>}
                        </div>
                        <div>
                          <p className="font-medium text-[#5C4A37] text-sm">{request.targetProfile?.nickname}</p>
                          <p className="text-xs text-[#A08060]">{request.targetProfile?.registeredBy?.nickname}님이 소개</p>
                        </div>
                      </div>
                    </div>

                    {/* 메시지 */}
                    {request.message && (
                      <p className="text-sm text-[#8B7355] bg-[#FAF8F3] rounded-lg p-3 mb-3">
                        "{request.message}"
                      </p>
                    )}

                    {/* 상태 */}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {getStatusText(request.status)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>
    </div>
  );
}
