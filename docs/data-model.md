# 데이터 모델 스펙

## ERD 개요
```
User (사용자/직원)
  ├── Profile (프로필)
  └── MatchRequest (매칭 신청)
       └── Match (매칭 결과)
```

## 테이블 스펙

### 1. users (사용자 테이블)
버즈빌 직원 계정 정보

| 컬럼명 | 타입 | 설명 | 제약조건 |
|--------|------|------|----------|
| id | UUID/String | 사용자 고유 ID | PK, 자동 생성 |
| email | String | 이메일 주소 | UNIQUE, NOT NULL |
| name | String | 이름 | NOT NULL |
| department | String | 부서 | |
| created_at | DateTime | 생성일시 | NOT NULL |
| updated_at | DateTime | 수정일시 | NOT NULL |
| email_verified | Boolean | 이메일 인증 여부 | DEFAULT false |
| role | String | 역할 (user/admin) | DEFAULT 'user' |

**인덱스**:
- `email` (UNIQUE)
- `created_at`

---

### 2. profiles (프로필 테이블)
소개팅 프로필 정보

| 컬럼명 | 타입 | 설명 | 제약조건 |
|--------|------|------|----------|
| id | UUID/String | 프로필 고유 ID | PK, 자동 생성 |
| user_id | UUID/String | 사용자 ID | FK -> users.id, NOT NULL |
| registered_by | UUID/String | 등록한 사람 ID | FK -> users.id, NOT NULL (본인이거나 친구) |
| name | String | 프로필 이름 | NOT NULL |
| age | Integer | 나이 | |
| bio | Text | 자기소개 | |
| department | String | 부서 | |
| interests | String[]/JSON | 관심사 배열 | |
| profile_image_url | String | 프로필 이미지 URL | |
| contact_preference | String | 연락 선호 방식 (email/kakao/phone) | |
| contact_info | String | 연락처 정보 | |
| is_active | Boolean | 활성 상태 | DEFAULT true |
| created_at | DateTime | 생성일시 | NOT NULL |
| updated_at | DateTime | 수정일시 | NOT NULL |

**인덱스**:
- `user_id` (FK)
- `registered_by` (FK)
- `is_active`
- `created_at`

**비즈니스 규칙**:
- 한 사용자(user_id)당 하나의 활성 프로필만 존재
- `registered_by`가 본인(`user_id`)이 아닌 경우, 친구가 대신 등록한 것으로 간주
- 프로필은 본인(`user_id`) 또는 등록자(`registered_by`)만 수정 가능

---

### 3. match_requests (매칭 신청 테이블)
매칭 신청 내역

| 컬럼명 | 타입 | 설명 | 제약조건 |
|--------|------|------|----------|
| id | UUID/String | 신청 고유 ID | PK, 자동 생성 |
| requester_profile_id | UUID/String | 신청자 프로필 ID | FK -> profiles.id, NOT NULL |
| target_profile_id | UUID/String | 신청 대상 프로필 ID | FK -> profiles.id, NOT NULL |
| status | String | 상태 | NOT NULL (pending/accepted/rejected/cancelled) |
| message | Text | 신청 메시지 (선택) | |
| created_at | DateTime | 생성일시 | NOT NULL |
| updated_at | DateTime | 수정일시 | NOT NULL |
| responded_at | DateTime | 응답일시 | |

**인덱스**:
- `requester_profile_id` (FK)
- `target_profile_id` (FK)
- `status`
- 복합 인덱스: `(requester_profile_id, target_profile_id)` (UNIQUE, 중복 신청 방지)

**비즈니스 규칙**:
- 같은 두 프로필 간 중복 신청 불가
- 본인 프로필에 신청 불가 (`requester_profile_id != target_profile_id`)
- `status` 값:
  - `pending`: 대기 중
  - `accepted`: 수락됨
  - `rejected`: 거절됨
  - `cancelled`: 취소됨 (신청자가 취소)

---

### 4. matches (매칭 결과 테이블)
매칭 성사된 경우의 정보

| 컬럼명 | 타입 | 설명 | 제약조건 |
|--------|------|------|----------|
| id | UUID/String | 매칭 고유 ID | PK, 자동 생성 |
| match_request_id | UUID/String | 매칭 신청 ID | FK -> match_requests.id, UNIQUE, NOT NULL |
| profile1_id | UUID/String | 프로필1 ID | FK -> profiles.id, NOT NULL |
| profile2_id | UUID/String | 프로필2 ID | FK -> profiles.id, NOT NULL |
| status | String | 매칭 상태 | NOT NULL (active/completed/cancelled) |
| created_at | DateTime | 생성일시 | NOT NULL |
| updated_at | DateTime | 수정일시 | NOT NULL |

**인덱스**:
- `match_request_id` (UNIQUE, FK)
- `profile1_id` (FK)
- `profile2_id` (FK)
- `status`
- 복합 인덱스: `(profile1_id, profile2_id)` (중복 매칭 방지)

**비즈니스 규칙**:
- `match_request_id`는 `match_requests.status = 'accepted'`인 경우에만 생성
- `profile1_id`와 `profile2_id`는 순서 무관 (같은 매칭을 의미)
- `status` 값:
  - `active`: 활성 매칭 (진행 중)
  - `completed`: 완료 (연락처 교환 완료 등)
  - `cancelled`: 취소됨

---

## 관계 요약

1. **users** 1:N **profiles** (한 사용자는 여러 프로필을 가질 수 있지만, 활성은 하나만)
2. **profiles** N:N **profiles** (through **match_requests**) - 매칭 신청 관계
3. **match_requests** 1:1 **matches** - 매칭 성사 시 matches 생성

## 추가 고려사항

### 프로필 이미지 저장
- **옵션 1**: Supabase Storage 사용 (추천)
- **옵션 2**: Cloudinary, AWS S3 등
- **옵션 3**: Vercel Blob Storage

### 관심사 (interests)
- PostgreSQL Array 타입 사용
- 또는 별도 `profile_interests` 테이블로 정규화 (검색 최적화)

### 확장 가능성
- 알림 기능 (매칭 신청, 수락 등)
- 매칭 후기/평가 기능
- 통계 및 분석 기능

