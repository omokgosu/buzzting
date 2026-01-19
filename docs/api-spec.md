# API 명세서

## 기본 정보
- **Base URL**: `/api`
- **인증**: 세션 기반 (JWT 또는 NextAuth.js)
- **응답 형식**: JSON

## 공통 응답 형식

### 성공 응답
```json
{
  "success": true,
  "data": { ... }
}
```

### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지"
  }
}
```

## API 엔드포인트

### 인증 관련

#### 1. 로그인
- **POST** `/api/auth/login`
- **요청 본문**:
  ```json
  {
    "email": "user@buzzvil.com"
  }
  ```
- **응답**:
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "uuid",
        "email": "user@buzzvil.com",
        "nickname": "홍길동",
        "name": "홍길동",
        "department": "개발팀"
      },
      "token": "jwt_token"
    }
  }
  ```
- **에러 코드**:
  - `VALIDATION_ERROR`: 이메일이 제공되지 않음
  - `INVALID_EMAIL_DOMAIN`: 버즈빌 이메일이 아님
  - `USER_NOT_FOUND`: 등록되지 않은 이메일

---

#### 2. 로그아웃
- **POST** `/api/auth/logout`
- **인증**: 필요
- **응답**:
  ```json
  {
    "success": true
  }
  ```

---

#### 3. 현재 사용자 정보 조회
- **GET** `/api/auth/me`
- **인증**: 필요
- **응답**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "email": "user@buzzvil.com",
      "name": "홍길동",
      "department": "개발팀"
    }
  }
  ```

---

### 프로필 관련

#### 6. 프로필 목록 조회
- **GET** `/api/profiles`
- **쿼리 파라미터**:
  - `page`: 페이지 번호 (기본: 1)
  - `limit`: 페이지당 개수 (기본: 20)
  - `department`: 부서 필터
- **응답**:
  ```json
  {
    "success": true,
    "data": {
      "profiles": [
        {
          "id": "uuid",
          "name": "홍길동",
          "age": 28,
          "bio": "자기소개...",
          "department": "개발팀",
          "interests": ["운동", "독서"],
          "profile_image_url": "https://...",
          "created_at": "2024-01-01T00:00:00Z"
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 20,
        "total": 100,
        "totalPages": 5
      }
    }
  }
  ```

---

#### 7. 프로필 상세 조회
- **GET** `/api/profiles/[id]`
- **응답**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "user_id": "uuid",
      "name": "홍길동",
      "age": 28,
      "bio": "자기소개...",
      "department": "개발팀",
      "interests": ["운동", "독서"],
      "profile_image_url": "https://...",
      "contact_preference": "kakao",
      "created_at": "2024-01-01T00:00:00Z"
    }
  }
  ```

---

#### 8. 프로필 등록
- **POST** `/api/profiles`
- **인증**: 필요
- **요청 본문**:
  ```json
  {
    "user_id": "uuid", // 본인이면 본인 ID, 친구면 친구 ID
    "name": "홍길동",
    "age": 28,
    "bio": "자기소개...",
    "department": "개발팀",
    "interests": ["운동", "독서"],
    "contact_preference": "kakao",
    "contact_info": "kakao_id"
  }
  ```
- **응답**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "user_id": "uuid",
      "name": "홍길동",
      ...
    }
  }
  ```
- **에러 코드**:
  - `ALREADY_HAS_ACTIVE_PROFILE`: 이미 활성 프로필이 있음
  - `UNAUTHORIZED`: 권한 없음 (본인 또는 친구만 등록 가능)

---

#### 9. 프로필 수정
- **PUT** `/api/profiles/[id]`
- **인증**: 필요
- **권한**: 본인(`user_id`) 또는 등록자(`registered_by`)만 수정 가능
- **요청 본문**: 프로필 등록과 동일 (일부 필드만 수정 가능)
- **응답**: 프로필 상세 조회와 동일

---

#### 10. 프로필 삭제 (비활성화)
- **DELETE** `/api/profiles/[id]`
- **인증**: 필요
- **권한**: 본인 또는 등록자만 삭제 가능
- **응답**:
  ```json
  {
    "success": true
  }
  ```
- **비고**: 실제 삭제가 아닌 `is_active = false`로 변경

---

### 매칭 관련

#### 11. 매칭 신청
- **POST** `/api/match-requests`
- **인증**: 필요
- **요청 본문**:
  ```json
  {
    "target_profile_id": "uuid",
    "message": "안녕하세요! 관심 있어요."
  }
  ```
- **응답**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "requester_profile_id": "uuid",
      "target_profile_id": "uuid",
      "status": "pending",
      "message": "안녕하세요! 관심 있어요.",
      "created_at": "2024-01-01T00:00:00Z"
    }
  }
  ```
- **에러 코드**:
  - `DUPLICATE_REQUEST`: 이미 신청한 매칭
  - `SELF_REQUEST`: 본인 프로필에 신청 불가
  - `PROFILE_NOT_FOUND`: 프로필을 찾을 수 없음

---

#### 12. 매칭 신청 목록 조회
- **GET** `/api/match-requests`
- **인증**: 필요
- **쿼리 파라미터**:
  - `type`: `sent` (보낸 신청) 또는 `received` (받은 신청)
  - `status`: `pending` / `accepted` / `rejected` / `cancelled`
- **응답**:
  ```json
  {
    "success": true,
    "data": {
      "requests": [
        {
          "id": "uuid",
          "requester_profile": { ... },
          "target_profile": { ... },
          "status": "pending",
          "message": "...",
          "created_at": "2024-01-01T00:00:00Z"
        }
      ]
    }
  }
  ```

---

#### 13. 매칭 신청 수락
- **POST** `/api/match-requests/[id]/accept`
- **인증**: 필요
- **권한**: 신청 대상자(`target_profile_id`의 소유자)만 수락 가능
- **응답**:
  ```json
  {
    "success": true,
    "data": {
      "match_request": {
        "id": "uuid",
        "status": "accepted",
        "responded_at": "2024-01-01T00:00:00Z"
      },
      "match": {
        "id": "uuid",
        "profile1_id": "uuid",
        "profile2_id": "uuid",
        "status": "active"
      }
    }
  }
  ```

---

#### 14. 매칭 신청 거절
- **POST** `/api/match-requests/[id]/reject`
- **인증**: 필요
- **권한**: 신청 대상자만 거절 가능
- **응답**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "status": "rejected",
      "responded_at": "2024-01-01T00:00:00Z"
    }
  }
  ```

---

#### 15. 매칭 신청 취소
- **POST** `/api/match-requests/[id]/cancel`
- **인증**: 필요
- **권한**: 신청자만 취소 가능
- **응답**: 매칭 신청 거절과 동일

---

#### 16. 매칭 목록 조회
- **GET** `/api/matches`
- **인증**: 필요
- **응답**:
  ```json
  {
    "success": true,
    "data": {
      "matches": [
        {
          "id": "uuid",
          "profile1": { ... },
          "profile2": { ... },
          "status": "active",
          "created_at": "2024-01-01T00:00:00Z"
        }
      ]
    }
  }
  ```

---

## 인증 미들웨어

모든 인증이 필요한 API는 다음과 같은 미들웨어를 통과해야 합니다:

1. 세션/JWT 토큰 검증
2. 사용자 정보 로드
3. 권한 확인 (필요 시)

## 에러 코드 목록

- `UNAUTHORIZED`: 인증되지 않음
- `FORBIDDEN`: 권한 없음
- `NOT_FOUND`: 리소스를 찾을 수 없음
- `VALIDATION_ERROR`: 입력값 검증 실패
- `INVALID_EMAIL_DOMAIN`: 유효하지 않은 이메일 도메인
- `USER_NOT_FOUND`: 등록되지 않은 사용자
- `ALREADY_HAS_ACTIVE_PROFILE`: 이미 활성 프로필 존재
- `DUPLICATE_REQUEST`: 중복 신청
- `SELF_REQUEST`: 본인에게 신청 불가
- `PROFILE_NOT_FOUND`: 프로필 없음
- `MATCH_REQUEST_NOT_FOUND`: 매칭 신청 없음
- `INVALID_STATUS`: 잘못된 상태 변경

