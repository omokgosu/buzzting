"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { profileApi, authApi } from "@/lib/api-client";
import { getToken } from "@/lib/auth-client";
import { CHARACTERS } from "@/components/CharacterIcons";

// 선택 옵션들
const IDEAL_TYPES = [
  "대화가 잘 통하는 사람",
  "웃음코드가 맞는 사람",
  "자기 일에 열정적인 사람",
  "배려심 깊고 따뜻한 사람",
  "외향적이고 활발한 사람",
  "내향적이고 잔잔한 사람",
  "센스있고 유머러스한 사람",
  "즉흥적이고 모험을 즐기는 사람",
  "적극적이고 리드하는 사람",
];

const DATE_STYLES = [
  "자연속에서 힐링 (캠핑/등산/드라이브)",
  "활기찬 액티비티 (놀이공원/스포츠/여행)",
  "편안한 실내데이트 (집/영화/보드게임)",
  "여유로운 카페산책 (동네 카페/공원 산책)",
  "문화생활 즐기기 (전시회/공연/영화관람)",
  "맛집탐방 (새로운 음식/술 한잔)",
];

const INTERESTS = [
  "영화/드라마",
  "전시/공연",
  "독서/웹소설",
  "음악/악기",
  "운동/헬스",
  "요가/필라테스",
  "여행",
  "캠핑",
  "카페/맛집",
  "요리/베이킹",
  "반려동물",
  "패션/스타일",
];

const DATING_STYLES = [
  "직진형 (마음 가면 바로 직진)",
  "천천히 알아가는 타입",
  "리드하는 편",
  "리드 받는 걸 선호",
];

const CONTACT_STYLES = [
  "카톡 빠른 답장파",
  "답장 느리지만 꾸준파",
  "톡보단 직접 만남 선호",
  "통화 선호",
];

const SMOKING_OPTIONS = ["비흡연", "흡연", "가끔"];
const DRINKING_OPTIONS = ["안 마심", "월 1-2회", "주 1-2회", "주 3회 이상"];

export default function NewProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [customInterest, setCustomInterest] = useState("");
  const [formData, setFormData] = useState({
    character: "",
    nickname: "",
    birthYear: "",
    bio: "",
    height: "",
    mbti: "",
    location: "",
    job: "",
    smoking: "",
    drinking: "",
    interests: [] as string[],
    idealTypes: [] as string[],
    dateStyles: [] as string[],
    datingStyles: [] as string[],
    contactStyles: [] as string[],
    contactPreference: "" as string,
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const response = await authApi.me();
      if (response.success && response.data) {
        setUser(response.data.user);
      }
    } catch (error) {
      router.push("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  const toggleArrayItem = (
    field: "interests" | "idealTypes" | "dateStyles" | "datingStyles" | "contactStyles",
    item: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const addCustomInterest = () => {
    const trimmed = customInterest.trim();
    if (trimmed && !formData.interests.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, trimmed],
      }));
      setCustomInterest("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await profileApi.create({
        userId: user.id,
        character: formData.character || undefined,
        nickname: formData.nickname,
        birthYear: formData.birthYear ? parseInt(formData.birthYear) : undefined,
        bio: formData.bio || undefined,
        height: formData.height ? parseInt(formData.height) : undefined,
        mbti: formData.mbti || undefined,
        location: formData.location || undefined,
        job: formData.job || undefined,
        smoking: formData.smoking || undefined,
        drinking: formData.drinking || undefined,
        interests: formData.interests,
        idealTypes: formData.idealTypes,
        dateStyles: formData.dateStyles,
        datingStyles: formData.datingStyles,
        contactStyles: formData.contactStyles,
        contactPreference: formData.contactPreference || undefined,
      });

      if (response.success) {
        router.push(`/profile/${response.data?.profile.id}`);
      } else {
        setError(response.error?.message || "프로필 등록에 실패했습니다.");
      }
    } catch (error) {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

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
            <Link href="/home" className="text-sm text-[#A08060] active:text-[#8B7355] transition-colors">
              ← 목록으로
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 pb-24">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#E8DDD4]">
          <h1 className="text-xl font-bold text-[#5C4A37] mb-2">내 친구 소개하기</h1>
          <p className="text-sm text-[#A08060] mb-6">
            버즈빌 직원이 직접 친구를 소개해주세요! 자세히 적을수록 매칭 확률이 올라갑니다
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 캐릭터 선택 */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                캐릭터 선택
              </h2>
              <p className="text-xs text-[#A08060] -mt-2">
                친구를 대표할 캐릭터를 선택해주세요
              </p>
              <div className="grid grid-cols-4 gap-3">
                {CHARACTERS.map((char) => {
                  const Icon = char.icon;
                  const isSelected = formData.character === char.id;
                  return (
                    <button
                      key={char.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, character: char.id })}
                      className={`flex flex-col items-center p-3 rounded-xl transition-all active:scale-95 ${
                        isSelected
                          ? "bg-[#C4956A] shadow-md"
                          : "bg-[#F5EDE5]"
                      }`}
                    >
                      <Icon size={40} />
                      <span className={`text-xs mt-1 font-medium ${
                        isSelected ? "text-white" : "text-[#8B7355]"
                      }`}>
                        {char.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 기본 정보 */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                기본 정보
              </h2>

              <div>
                <label className="block text-sm font-medium text-[#8B7355] mb-1">
                  닉네임 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E0D4C8] rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] text-[#5C4A37] placeholder:text-[#B8A090]"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  placeholder="친구의 닉네임"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#8B7355] mb-1">년생</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-[#E0D4C8] rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] text-[#5C4A37] placeholder:text-[#B8A090]"
                    value={formData.birthYear}
                    onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                    placeholder="예: 1995"
                    min="1970"
                    max="2010"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#8B7355] mb-1">키</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-[#E0D4C8] rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] text-[#5C4A37] placeholder:text-[#B8A090]"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="cm"
                    min="140"
                    max="220"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#8B7355] mb-1">MBTI</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#E0D4C8] rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] text-[#5C4A37] placeholder:text-[#B8A090] uppercase"
                    value={formData.mbti}
                    onChange={(e) => setFormData({ ...formData, mbti: e.target.value.toUpperCase() })}
                    placeholder="예: ENFP"
                    maxLength={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#8B7355] mb-1">거주지</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#E0D4C8] rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] text-[#5C4A37] placeholder:text-[#B8A090]"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="예: 서울 강남"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B7355] mb-1">직장</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E0D4C8] rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] text-[#5C4A37] placeholder:text-[#B8A090]"
                  value={formData.job}
                  onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                  placeholder="예: 프리랜서, 회사원, 버즈빌 등 자유롭게"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B7355] mb-2">흡연</label>
                <div className="flex flex-wrap gap-2">
                  {SMOKING_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, smoking: formData.smoking === opt ? "" : opt })}
                      className={`px-4 py-2 text-sm rounded-full transition-all active:scale-95 ${
                        formData.smoking === opt
                          ? "bg-[#C4956A] text-white"
                          : "bg-[#F5EDE5] text-[#8B7355]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8B7355] mb-2">음주</label>
                <div className="flex flex-wrap gap-2">
                  {DRINKING_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, drinking: formData.drinking === opt ? "" : opt })}
                      className={`px-4 py-2 text-sm rounded-full transition-all active:scale-95 ${
                        formData.drinking === opt
                          ? "bg-[#C4956A] text-white"
                          : "bg-[#F5EDE5] text-[#8B7355]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 친구 소개글 */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                친구 소개
              </h2>
              <div>
                <label className="block text-sm font-medium text-[#8B7355] mb-1">
                  내 친구는 이런 사람이에요
                </label>
                <textarea
                  rows={4}
                  maxLength={1000}
                  className="w-full px-4 py-3 border border-[#E0D4C8] rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] text-[#5C4A37] placeholder:text-[#B8A090]"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="친구의 매력을 자유롭게 소개해주세요! 성격, 취미, 장점 등 자세할수록 좋아요"
                />
                <p className="text-xs text-[#A08060] text-right mt-1">{formData.bio.length}/1000</p>
              </div>
            </div>

            {/* 이상형 */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                이런 사람을 만나고 싶어요
              </h2>
              <div className="flex flex-wrap gap-2">
                {IDEAL_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleArrayItem("idealTypes", type)}
                    className={`px-3 py-2 text-sm rounded-full transition-all active:scale-95 ${
                      formData.idealTypes.includes(type)
                        ? "bg-[#C4956A] text-white"
                        : "bg-[#F5EDE5] text-[#8B7355]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 데이트 스타일 */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                선호하는 데이트 스타일
              </h2>
              <div className="flex flex-wrap gap-2">
                {DATE_STYLES.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => toggleArrayItem("dateStyles", style)}
                    className={`px-3 py-2 text-sm rounded-full transition-all active:scale-95 ${
                      formData.dateStyles.includes(style)
                        ? "bg-[#C4956A] text-white"
                        : "bg-[#F5EDE5] text-[#8B7355]"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* 관심사 */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                관심사
              </h2>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleArrayItem("interests", interest)}
                    className={`px-3 py-2 text-sm rounded-full transition-all active:scale-95 ${
                      formData.interests.includes(interest)
                        ? "bg-[#C4956A] text-white"
                        : "bg-[#F5EDE5] text-[#8B7355]"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              {/* 직접 입력한 관심사 */}
              {formData.interests.filter(i => !INTERESTS.includes(i)).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.interests.filter(i => !INTERESTS.includes(i)).map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleArrayItem("interests", interest)}
                      className="px-3 py-2 text-sm rounded-full bg-[#C4956A] text-white transition-all active:scale-95 flex items-center gap-1"
                    >
                      {interest}
                      <span className="text-white/80">×</span>
                    </button>
                  ))}
                </div>
              )}
              {/* 직접 입력 */}
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-[#E0D4C8] rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#C4956A] focus:border-[#C4956A] text-[#5C4A37] placeholder:text-[#B8A090] text-sm"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      addCustomInterest();
                    }
                  }}
                  placeholder="직접 입력 후 추가"
                  maxLength={20}
                />
                <button
                  type="button"
                  onClick={addCustomInterest}
                  className="px-4 py-2 text-sm rounded-xl bg-[#E8DDD4] text-[#5C4A37] font-medium active:scale-95 transition-all"
                >
                  추가
                </button>
              </div>
            </div>

            {/* 연애 스타일 */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                연애 스타일
              </h2>
              <div className="flex flex-wrap gap-2">
                {DATING_STYLES.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => toggleArrayItem("datingStyles", style)}
                    className={`px-3 py-2 text-sm rounded-full transition-all active:scale-95 ${
                      formData.datingStyles.includes(style)
                        ? "bg-[#C4956A] text-white"
                        : "bg-[#F5EDE5] text-[#8B7355]"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* 연락 스타일 */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                연락 스타일
              </h2>
              <div className="flex flex-wrap gap-2">
                {CONTACT_STYLES.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => toggleArrayItem("contactStyles", style)}
                    className={`px-3 py-2 text-sm rounded-full transition-all active:scale-95 ${
                      formData.contactStyles.includes(style)
                        ? "bg-[#C4956A] text-white"
                        : "bg-[#F5EDE5] text-[#8B7355]"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* 연락 선호 방식 */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-[#5C4A37] border-b border-[#E8DDD4] pb-2">
                연락 선호 방식
              </h2>
              <div className="flex flex-wrap gap-2">
                {["카카오톡", "전화", "인스타DM", "직접만남"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData({ ...formData, contactPreference: formData.contactPreference === opt ? "" : opt })}
                    className={`px-4 py-2 text-sm rounded-full transition-all active:scale-95 ${
                      formData.contactPreference === opt
                        ? "bg-[#C4956A] text-white"
                        : "bg-[#F5EDE5] text-[#8B7355]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-[#C4956A] to-[#B8A080] font-medium shadow-md disabled:opacity-50 active:scale-[0.97] transition-all"
              >
                {saving ? "등록 중..." : "등록하기"}
              </button>
              <Link
                href="/home"
                className="flex-1 text-center px-6 py-3 rounded-xl text-[#8B7355] bg-[#F5EDE5] font-medium active:scale-[0.97] transition-all"
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
