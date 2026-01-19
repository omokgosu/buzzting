// 캐릭터 아이콘 컴포넌트
// 따뜻한 베이지/카라멜 색상 테마에 맞는 귀여운 동물 캐릭터들
// 한국에서 인기있는 "OO상" 얼굴형 동물들 위주

interface CharacterIconProps {
  size?: number;
  className?: string;
}

// 여우상 - 영리하고 매력적인
export function FoxIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 귀 */}
      <ellipse cx="12" cy="12" rx="5" ry="8" fill="#E8A86B" transform="rotate(-15 12 12)" />
      <ellipse cx="36" cy="12" rx="5" ry="8" fill="#E8A86B" transform="rotate(15 36 12)" />
      <ellipse cx="12" cy="13" rx="3" ry="5" fill="#F5EDE5" transform="rotate(-15 12 13)" />
      <ellipse cx="36" cy="13" rx="3" ry="5" fill="#F5EDE5" transform="rotate(15 36 13)" />
      {/* 얼굴 */}
      <ellipse cx="24" cy="28" rx="15" ry="14" fill="#E8A86B" />
      {/* 볼 */}
      <ellipse cx="13" cy="30" rx="5" ry="4" fill="#F5EDE5" />
      <ellipse cx="35" cy="30" rx="5" ry="4" fill="#F5EDE5" />
      {/* 이마 무늬 */}
      <ellipse cx="24" cy="22" rx="4" ry="3" fill="#C4956A" />
      {/* 코 */}
      <ellipse cx="24" cy="32" rx="3" ry="2.5" fill="#5C4A37" />
      {/* 눈 - 둥글게 */}
      <ellipse cx="18" cy="26" rx="3" ry="3.5" fill="#5C4A37" />
      <ellipse cx="30" cy="26" rx="3" ry="3.5" fill="#5C4A37" />
      <circle cx="17" cy="25" r="1.5" fill="white" />
      <circle cx="29" cy="25" r="1.5" fill="white" />
      {/* 입 - 미소 */}
      <path d="M21 35 Q24 38 27 35" stroke="#5C4A37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="14" cy="32" rx="2" ry="1" fill="#E8A86B" opacity="0.6" />
      <ellipse cx="34" cy="32" rx="2" ry="1" fill="#E8A86B" opacity="0.6" />
    </svg>
  );
}

// 곰상 - 따뜻하고 포근한
export function BearIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 귀 - 둥글게 */}
      <circle cx="10" cy="12" r="7" fill="#C4956A" />
      <circle cx="38" cy="12" r="7" fill="#C4956A" />
      <circle cx="10" cy="12" r="4" fill="#E8A86B" />
      <circle cx="38" cy="12" r="4" fill="#E8A86B" />
      {/* 얼굴 - 둥글게 */}
      <circle cx="24" cy="28" r="16" fill="#C4956A" />
      {/* 주둥이 - 둥글게 */}
      <ellipse cx="24" cy="32" rx="8" ry="7" fill="#E8DDD4" />
      {/* 코 */}
      <ellipse cx="24" cy="30" rx="3.5" ry="2.5" fill="#5C4A37" />
      {/* 눈 - 둥글둥글 */}
      <circle cx="17" cy="24" r="3" fill="#5C4A37" />
      <circle cx="31" cy="24" r="3" fill="#5C4A37" />
      <circle cx="16" cy="23" r="1.2" fill="white" />
      <circle cx="30" cy="23" r="1.2" fill="white" />
      {/* 입 - 미소 */}
      <path d="M21 35 Q24 38 27 35" stroke="#5C4A37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="11" cy="28" rx="3" ry="2" fill="#E8A86B" opacity="0.5" />
      <ellipse cx="37" cy="28" rx="3" ry="2" fill="#E8A86B" opacity="0.5" />
    </svg>
  );
}

// 늑대상 - 카리스마 있는
export function WolfIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 귀 - 부드럽게 */}
      <ellipse cx="11" cy="10" rx="5" ry="9" fill="#A08060" transform="rotate(-10 11 10)" />
      <ellipse cx="37" cy="10" rx="5" ry="9" fill="#A08060" transform="rotate(10 37 10)" />
      <ellipse cx="11" cy="11" rx="3" ry="6" fill="#B8A090" transform="rotate(-10 11 11)" />
      <ellipse cx="37" cy="11" rx="3" ry="6" fill="#B8A090" transform="rotate(10 37 11)" />
      {/* 얼굴 - 둥글게 */}
      <ellipse cx="24" cy="28" rx="15" ry="14" fill="#A08060" />
      {/* 이마 무늬 */}
      <ellipse cx="24" cy="20" rx="6" ry="4" fill="#8B7355" />
      {/* 주둥이 */}
      <ellipse cx="24" cy="32" rx="7" ry="6" fill="#E8DDD4" />
      {/* 코 */}
      <ellipse cx="24" cy="30" rx="3" ry="2" fill="#5C4A37" />
      {/* 눈 - 살짝 날카롭지만 귀엽게 */}
      <ellipse cx="17" cy="24" rx="3" ry="3.5" fill="#5C4A37" />
      <ellipse cx="31" cy="24" rx="3" ry="3.5" fill="#5C4A37" />
      <circle cx="16" cy="23" r="1.2" fill="#C4956A" />
      <circle cx="30" cy="23" r="1.2" fill="#C4956A" />
      {/* 입 */}
      <path d="M21 35 Q24 37 27 35" stroke="#5C4A37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 토끼상 - 귀엽고 사랑스러운
export function RabbitIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 귀 - 길고 둥글게 */}
      <ellipse cx="16" cy="10" rx="5" ry="12" fill="#F5EDE5" />
      <ellipse cx="32" cy="10" rx="5" ry="12" fill="#F5EDE5" />
      <ellipse cx="16" cy="10" rx="3" ry="8" fill="#EACFBF" />
      <ellipse cx="32" cy="10" rx="3" ry="8" fill="#EACFBF" />
      {/* 얼굴 - 통통하게 */}
      <circle cx="24" cy="30" r="14" fill="#F5EDE5" />
      {/* 볼 - 빵빵하게 */}
      <ellipse cx="12" cy="32" rx="4" ry="3" fill="#EACFBF" />
      <ellipse cx="36" cy="32" rx="4" ry="3" fill="#EACFBF" />
      {/* 코 */}
      <ellipse cx="24" cy="32" rx="2.5" ry="2" fill="#E8A86B" />
      {/* 눈 - 크고 동그랗게 */}
      <circle cx="18" cy="28" r="3.5" fill="#5C4A37" />
      <circle cx="30" cy="28" r="3.5" fill="#5C4A37" />
      <circle cx="17" cy="27" r="1.5" fill="white" />
      <circle cx="29" cy="27" r="1.5" fill="white" />
      {/* 입 - Y자 */}
      <path d="M24 34 L24 36 M22 37 L24 36 L26 37" stroke="#5C4A37" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* 볼터치 */}
      <ellipse cx="14" cy="32" rx="2" ry="1.5" fill="#E8A86B" opacity="0.4" />
      <ellipse cx="34" cy="32" rx="2" ry="1.5" fill="#E8A86B" opacity="0.4" />
    </svg>
  );
}

// 고양이상 - 도도하고 매력적인
export function CatIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 귀 - 삼각형이지만 둥글게 */}
      <path d="M8 10 Q6 20 16 20 Q12 10 8 10" fill="#E8DDD4" />
      <path d="M40 10 Q42 20 32 20 Q36 10 40 10" fill="#E8DDD4" />
      <path d="M10 13 Q9 18 14 18 Q12 13 10 13" fill="#EACFBF" />
      <path d="M38 13 Q39 18 34 18 Q36 13 38 13" fill="#EACFBF" />
      {/* 얼굴 - 둥글게 */}
      <circle cx="24" cy="28" r="14" fill="#E8DDD4" />
      {/* 볼 */}
      <ellipse cx="12" cy="30" rx="3" ry="2.5" fill="#EACFBF" />
      <ellipse cx="36" cy="30" rx="3" ry="2.5" fill="#EACFBF" />
      {/* 코 */}
      <path d="M22 30 Q24 32 26 30 Q24 29 22 30" fill="#E8A86B" />
      {/* 눈 - 고양이 눈 */}
      <ellipse cx="18" cy="26" rx="4" ry="4.5" fill="#C4956A" />
      <ellipse cx="30" cy="26" rx="4" ry="4.5" fill="#C4956A" />
      <ellipse cx="18" cy="26" rx="2" ry="4" fill="#5C4A37" />
      <ellipse cx="30" cy="26" rx="2" ry="4" fill="#5C4A37" />
      <circle cx="17" cy="25" r="1" fill="white" />
      <circle cx="29" cy="25" r="1" fill="white" />
      {/* 입 */}
      <path d="M21 33 Q24 35 27 33" stroke="#5C4A37" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* 수염 */}
      <line x1="8" y1="28" x2="14" y2="29" stroke="#C4956A" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="8" y1="31" x2="14" y2="31" stroke="#C4956A" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="34" y1="29" x2="40" y2="28" stroke="#C4956A" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="34" y1="31" x2="40" y2="31" stroke="#C4956A" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

// 강아지상 - 하얀 귀여운 강아지
export function DogIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 복슬복슬한 흰 털 */}
      <circle cx="10" cy="20" r="6" fill="#F5EDE5" />
      <circle cx="38" cy="20" r="6" fill="#F5EDE5" />
      <circle cx="14" cy="14" r="5" fill="#F5EDE5" />
      <circle cx="34" cy="14" r="5" fill="#F5EDE5" />
      <circle cx="24" cy="12" r="5" fill="#F5EDE5" />
      {/* 귀 - 작고 둥글게 (살짝 베이지) */}
      <ellipse cx="12" cy="16" rx="5" ry="6" fill="#E8DDD4" />
      <ellipse cx="36" cy="16" rx="5" ry="6" fill="#E8DDD4" />
      {/* 얼굴 - 둥글둥글 흰색 */}
      <circle cx="24" cy="28" r="14" fill="#F5EDE5" />
      {/* 이마 털 */}
      <ellipse cx="24" cy="18" rx="8" ry="5" fill="#E8DDD4" />
      {/* 주둥이 - 둥글게 */}
      <ellipse cx="24" cy="32" rx="7" ry="6" fill="white" />
      {/* 코 */}
      <ellipse cx="24" cy="30" rx="3" ry="2.5" fill="#5C4A37" />
      {/* 눈 - 크고 반짝반짝 */}
      <circle cx="17" cy="26" r="4" fill="#5C4A37" />
      <circle cx="31" cy="26" r="4" fill="#5C4A37" />
      <circle cx="16" cy="25" r="1.8" fill="white" />
      <circle cx="30" cy="25" r="1.8" fill="white" />
      <circle cx="18" cy="27" r="0.8" fill="white" />
      <circle cx="32" cy="27" r="0.8" fill="white" />
      {/* 입 - 웃는 */}
      <path d="M21 35 Q24 38 27 35" stroke="#5C4A37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 혀 - 귀엽게 */}
      <ellipse cx="24" cy="37" rx="2" ry="2.5" fill="#EACFBF" />
      {/* 볼터치 */}
      <ellipse cx="12" cy="30" rx="2" ry="1.5" fill="#E8A86B" opacity="0.4" />
      <ellipse cx="36" cy="30" rx="2" ry="1.5" fill="#E8A86B" opacity="0.4" />
    </svg>
  );
}

// 호랑이상 - 당당하고 카리스마
export function TigerIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 귀 - 둥글게 */}
      <circle cx="10" cy="12" r="7" fill="#E8A86B" />
      <circle cx="38" cy="12" r="7" fill="#E8A86B" />
      <circle cx="10" cy="12" r="4" fill="#F5EDE5" />
      <circle cx="38" cy="12" r="4" fill="#F5EDE5" />
      {/* 얼굴 - 둥글게 */}
      <circle cx="24" cy="28" r="16" fill="#E8A86B" />
      {/* 호랑이 줄무늬 - 부드럽게 */}
      <path d="M18 18 Q19 22 20 20" stroke="#C4956A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 16 Q24 20 24 19" stroke="#C4956A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 18 Q29 22 28 20" stroke="#C4956A" strokeWidth="2.5" strokeLinecap="round" />
      {/* 볼 */}
      <ellipse cx="11" cy="30" rx="5" ry="4" fill="#F5EDE5" />
      <ellipse cx="37" cy="30" rx="5" ry="4" fill="#F5EDE5" />
      {/* 주둥이 */}
      <ellipse cx="24" cy="32" rx="7" ry="6" fill="#F5EDE5" />
      {/* 코 */}
      <ellipse cx="24" cy="30" rx="3" ry="2.5" fill="#5C4A37" />
      {/* 눈 - 둥글게 */}
      <circle cx="17" cy="24" r="3.5" fill="#5C4A37" />
      <circle cx="31" cy="24" r="3.5" fill="#5C4A37" />
      <circle cx="16" cy="23" r="1.5" fill="white" />
      <circle cx="30" cy="23" r="1.5" fill="white" />
      {/* 입 - 웃는 */}
      <path d="M21 35 Q24 38 27 35" stroke="#5C4A37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 거북이상 - 귀여운 거북이 얼굴
export function TurtleIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 머리 뒤 등껍질 살짝 */}
      <ellipse cx="24" cy="36" rx="12" ry="8" fill="#7EAA6D" />
      {/* 얼굴 - 연두색 둥근 얼굴 */}
      <circle cx="24" cy="24" r="16" fill="#9DC88D" />
      {/* 볼 - 밝은 연두 */}
      <ellipse cx="10" cy="28" rx="4" ry="3" fill="#B8D9A8" />
      <ellipse cx="38" cy="28" rx="4" ry="3" fill="#B8D9A8" />
      {/* 눈 - 크고 동글동글 */}
      <circle cx="17" cy="22" r="4" fill="#5C4A37" />
      <circle cx="31" cy="22" r="4" fill="#5C4A37" />
      <circle cx="16" cy="21" r="1.8" fill="white" />
      <circle cx="30" cy="21" r="1.8" fill="white" />
      {/* 코 - 작고 귀여운 콧구멍 두개 */}
      <circle cx="22" cy="28" r="1.2" fill="#6B9B5A" />
      <circle cx="26" cy="28" r="1.2" fill="#6B9B5A" />
      {/* 입 - 귀여운 미소 */}
      <path d="M20 33 Q24 37 28 33" stroke="#5C4A37" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="12" cy="30" rx="3" ry="2" fill="#E8A86B" opacity="0.35" />
      <ellipse cx="36" cy="30" rx="3" ry="2" fill="#E8A86B" opacity="0.35" />
    </svg>
  );
}

// 사슴상 - 순수하고 청순한
export function DeerIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 뿔 - 귀여운 느낌 */}
      <ellipse cx="14" cy="8" rx="2" ry="5" fill="#C4956A" />
      <ellipse cx="34" cy="8" rx="2" ry="5" fill="#C4956A" />
      <circle cx="11" cy="6" r="2.5" fill="#C4956A" />
      <circle cx="37" cy="6" r="2.5" fill="#C4956A" />
      {/* 귀 */}
      <ellipse cx="8" cy="18" rx="4" ry="7" fill="#E8A86B" transform="rotate(-20 8 18)" />
      <ellipse cx="40" cy="18" rx="4" ry="7" fill="#E8A86B" transform="rotate(20 40 18)" />
      <ellipse cx="8" cy="19" rx="2.5" ry="5" fill="#EACFBF" transform="rotate(-20 8 19)" />
      <ellipse cx="40" cy="19" rx="2.5" ry="5" fill="#EACFBF" transform="rotate(20 40 19)" />
      {/* 얼굴 - 둥글게 */}
      <ellipse cx="24" cy="30" rx="14" ry="13" fill="#E8A86B" />
      {/* 이마 */}
      <ellipse cx="24" cy="24" rx="6" ry="4" fill="#C4956A" />
      {/* 코 */}
      <ellipse cx="24" cy="34" rx="3" ry="2.5" fill="#5C4A37" />
      {/* 눈 - 크고 청순하게 */}
      <circle cx="17" cy="28" r="4.5" fill="#5C4A37" />
      <circle cx="31" cy="28" r="4.5" fill="#5C4A37" />
      <circle cx="16" cy="27" r="2" fill="white" />
      <circle cx="30" cy="27" r="2" fill="white" />
      <circle cx="18" cy="29" r="1" fill="white" />
      <circle cx="32" cy="29" r="1" fill="white" />
      {/* 입 */}
      <path d="M22 37 Q24 39 26 37" stroke="#5C4A37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="12" cy="32" rx="2.5" ry="2" fill="#E8A86B" opacity="0.5" />
      <ellipse cx="36" cy="32" rx="2.5" ry="2" fill="#E8A86B" opacity="0.5" />
    </svg>
  );
}

// 햄스터상 - 볼살 빵빵 귀여운
export function HamsterIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 귀 - 작고 둥글게 */}
      <circle cx="10" cy="14" r="5" fill="#E8A86B" />
      <circle cx="38" cy="14" r="5" fill="#E8A86B" />
      <circle cx="10" cy="14" r="3" fill="#EACFBF" />
      <circle cx="38" cy="14" r="3" fill="#EACFBF" />
      {/* 얼굴 - 통통하게 */}
      <circle cx="24" cy="28" r="16" fill="#E8A86B" />
      {/* 볼 - 빵빵하게!! */}
      <circle cx="10" cy="30" r="7" fill="#EACFBF" />
      <circle cx="38" cy="30" r="7" fill="#EACFBF" />
      {/* 이마 */}
      <ellipse cx="24" cy="20" rx="8" ry="5" fill="#C4956A" />
      {/* 코 */}
      <ellipse cx="24" cy="32" rx="2.5" ry="2" fill="#E8A86B" />
      {/* 눈 - 작고 반짝 */}
      <circle cx="18" cy="26" r="3" fill="#5C4A37" />
      <circle cx="30" cy="26" r="3" fill="#5C4A37" />
      <circle cx="17" cy="25" r="1.3" fill="white" />
      <circle cx="29" cy="25" r="1.3" fill="white" />
      {/* 입 - Y자 */}
      <path d="M24 34 L24 36 M22 37 L24 36 L26 37" stroke="#5C4A37" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* 볼터치 - 빵빵한 볼에 */}
      <ellipse cx="10" cy="32" rx="3" ry="2" fill="#E8A86B" opacity="0.5" />
      <ellipse cx="38" cy="32" rx="3" ry="2" fill="#E8A86B" opacity="0.5" />
    </svg>
  );
}

// 다람쥐상 - 앙증맞고 재빠른
export function SquirrelIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 귀 - 동글동글 끝이 뾰족 */}
      <ellipse cx="10" cy="12" rx="5" ry="7" fill="#C4956A" transform="rotate(-15 10 12)" />
      <ellipse cx="38" cy="12" rx="5" ry="7" fill="#C4956A" transform="rotate(15 38 12)" />
      {/* 귀 끝 털 */}
      <circle cx="8" cy="8" r="2" fill="#8B7355" />
      <circle cx="40" cy="8" r="2" fill="#8B7355" />
      {/* 얼굴 - 둥글게 */}
      <circle cx="24" cy="28" r="14" fill="#C4956A" />
      {/* 볼 - 도토리 넣은 듯 */}
      <ellipse cx="12" cy="30" rx="5" ry="4" fill="#E8DDD4" />
      <ellipse cx="36" cy="30" rx="5" ry="4" fill="#E8DDD4" />
      {/* 배 색상 */}
      <ellipse cx="24" cy="34" rx="8" ry="6" fill="#E8DDD4" />
      {/* 코 */}
      <ellipse cx="24" cy="30" rx="2.5" ry="2" fill="#5C4A37" />
      {/* 눈 - 동글동글 */}
      <circle cx="17" cy="26" r="3.5" fill="#5C4A37" />
      <circle cx="31" cy="26" r="3.5" fill="#5C4A37" />
      <circle cx="16" cy="25" r="1.5" fill="white" />
      <circle cx="30" cy="25" r="1.5" fill="white" />
      {/* 입 */}
      <path d="M22 34 Q24 36 26 34" stroke="#5C4A37" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <ellipse cx="12" cy="32" rx="2" ry="1.5" fill="#E8A86B" opacity="0.5" />
      <ellipse cx="36" cy="32" rx="2" ry="1.5" fill="#E8A86B" opacity="0.5" />
    </svg>
  );
}

// 병아리상 - 깜찍하고 사랑스러운
export function ChickIcon({ size = 48, className = "" }: CharacterIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      {/* 머리 깃털 */}
      <ellipse cx="24" cy="8" rx="3" ry="5" fill="#E8A86B" />
      <ellipse cx="20" cy="10" rx="2" ry="4" fill="#E8A86B" transform="rotate(-20 20 10)" />
      <ellipse cx="28" cy="10" rx="2" ry="4" fill="#E8A86B" transform="rotate(20 28 10)" />
      {/* 얼굴 - 동그랗게 */}
      <circle cx="24" cy="28" r="16" fill="#F5DC82" />
      {/* 볼 */}
      <ellipse cx="11" cy="30" rx="4" ry="3" fill="#F5EDE5" />
      <ellipse cx="37" cy="30" rx="4" ry="3" fill="#F5EDE5" />
      {/* 부리 */}
      <path d="M20 30 L24 35 L28 30 Z" fill="#E8A86B" />
      {/* 눈 - 동글동글 */}
      <circle cx="17" cy="26" r="4" fill="#5C4A37" />
      <circle cx="31" cy="26" r="4" fill="#5C4A37" />
      <circle cx="16" cy="25" r="1.8" fill="white" />
      <circle cx="30" cy="25" r="1.8" fill="white" />
      {/* 볼터치 */}
      <ellipse cx="12" cy="32" rx="3" ry="2" fill="#E8A86B" opacity="0.4" />
      <ellipse cx="36" cy="32" rx="3" ry="2" fill="#E8A86B" opacity="0.4" />
    </svg>
  );
}

// 캐릭터 목록과 메타데이터
export const CHARACTERS = [
  { id: "fox", name: "여우", icon: FoxIcon, description: "영리하고 매력적인" },
  { id: "rabbit", name: "토끼", icon: RabbitIcon, description: "귀엽고 사랑스러운" },
  { id: "cat", name: "고양이", icon: CatIcon, description: "도도하고 매력적인" },
  { id: "dog", name: "강아지", icon: DogIcon, description: "충직하고 활발한" },
  { id: "bear", name: "곰", icon: BearIcon, description: "따뜻하고 포근한" },
  { id: "deer", name: "사슴", icon: DeerIcon, description: "순수하고 청순한" },
  { id: "wolf", name: "늑대", icon: WolfIcon, description: "카리스마 있는" },
  { id: "tiger", name: "호랑이", icon: TigerIcon, description: "당당하고 씩씩한" },
  { id: "turtle", name: "거북이", icon: TurtleIcon, description: "순하고 청순한" },
  { id: "hamster", name: "햄스터", icon: HamsterIcon, description: "볼살 빵빵 귀여운" },
  { id: "squirrel", name: "다람쥐", icon: SquirrelIcon, description: "앙증맞고 재빠른" },
  { id: "chick", name: "병아리", icon: ChickIcon, description: "깜찍하고 사랑스러운" },
] as const;

export type CharacterId = typeof CHARACTERS[number]["id"];

// 캐릭터 ID로 아이콘 컴포넌트 가져오기
export function getCharacterIcon(characterId: string | null | undefined) {
  const character = CHARACTERS.find((c) => c.id === characterId);
  return character?.icon || null;
}

// 캐릭터 ID로 이름 가져오기
export function getCharacterName(characterId: string | null | undefined) {
  const character = CHARACTERS.find((c) => c.id === characterId);
  return character?.name || null;
}
