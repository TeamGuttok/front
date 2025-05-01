# 구똑: 구독을 똑똑하게 | https://www.guttok.site

<br>

<!-- //(동영상 추가 예정) -->

**"한눈에 보는 내 구독 서비스, 자동 알림으로 더 스마트하게!"**

이 프로젝트는 점차 다양해지는 구독 서비스 (예: 넷플릭스, 유튜브 프리미엄, 챗지피티 등)와 고정 지출 (예: 통신비, 주거비 등)을 효율적이고 체계적으로 관리할 수 있도록 돕는 플랫폼입니다.  
사용자는 **구독 서비스 목록에서 선택**하거나 **직접 입력**하여, **연/월/주 단위**로 결제 주기를 설정하고 **결제 금액, 결제 수단, 결제 여부 등**을 편리하게 관리할 수 있습니다.
등록한 고정지출은 등록한 `결제 일 하루 전, 오전 09시에 리마인드 알림이 발송`되어 결제일을 놓치지 않도록 도와줍니다.

<br>

# 기획 및 디자인

- [기획](https://www.relume.io/app/project/P1385173_IIXxQacXXzIBf0mRbbfWDikpCaVTBQb-PvtLL61wn5U#mode=sitemap)
- [PC 디자인](https://creatie.ai/file/147084540353878?page_id=M&shareId=147084540353878) | [Mobile 디자인](https://creatie.ai/file/146925248165840?fileOpenFrom=home&fileTileSwitch=false&page_id=M)

<br>

# 팀원 구성

| 이름   | 역할              | 담당 업무                                          |
| ------ | ----------------- | -------------------------------------------------- |
| 윤희은 | 프론트엔드 개발자 | 프로젝트 리딩, 기획, 디자인, 프론트엔드 개발, 배포 |
| 강주철 | 백엔드 개발자     | 기획, 디자인, 백엔드 개발, 서버 배포               |
| 오상민 | 백엔드 개발자     | 기획, 디자인, 백엔드 개발, 서버 배포               |

# 사용 스택

- **프레임워크 및 언어** : TypeScript, React, Next.js 15 (App Router 기반)
- **상태 및 데이터 관리** : Zustand (+ persist), TanStack Query (v5)
- **스타일 및 UI 구성, 유효성 검증** : Tailwind CSS, Radix UI, clsx, tailwind-variant, Zod
- **개발 도구 및 협업 환경** : ESLint, Prettier, TypeScript, Jira, Discord

# 주요 기능

### 애플리케이션 구조 및 라우팅

- Next.js 15의 App Router를 기반으로 파일 중심의 라우팅 및 중첩 레이아웃 구성
- 미들웨어를 활용해 로그인하지 않은 사용자의 접근을 제한하고 인증 흐름 제어

### UI/UX 구현

- 사용자 정보 수정, 구독 서비스 등록 등 주요 페이지를 `React` 기반 컴포넌트로 분리하여 구성
- `Radix UI`, `Tailwind CSS`로 반응형 및 접근성 있는 컴포넌트 구성
- `Zod`를 사용해서 사용자 입력값에 대한 유효성 검증 및 에러 메시지 표시 처리

### 클라이언트 상태 관리

- `zustand`와 `zustand-persist`를 사용해 로그인 상태, 사용자 정보, 구독 서비스 입력값 등 클라이언트 상태 유지
- 세션 스토리지를 기반으로 새로고침 이후에도 상태를 복원할 수 있도록 처리

### API 통신 및 인증 흐름

- **React Query로 API 요청 분리 및 데이터 캐싱**
  - 인증, 구독, 알림 등 주요 도메인별로 `api/`와 `client/`를 나눠 요청과 훅을 분리
  - `queryKey`를 기반으로 필요한 데이터만 요청하고, 변경 시 자동으로 갱신 처리 (`invalidateQueries` 활용)
- **세션 기반 인증 흐름 처리**
  - 로그인/회원가입/로그아웃 등 인증 요청 시 세션 정보를 활용해 접근 제어
  - 사용자의 로그인 여부에 따라 적절한 UI 제어 및 기능 접근 제한 구현

### 배포 및 CI/CD

- **도메인 및 HTTPS 설정**
  - AWS Route 53을 통해 도메인 등록
  - AWS ACM으로 SSL 인증서 적용 및 HTTPS 설정 완료
- **CI/CD 자동화**
  - AWS Amplify를 사용하여 프론트엔드 자동 배포 파이프라인 구축
  - `main` 브랜치에 푸시하면 자동으로 빌드 및 최신 버전 배포 진행

# 서버 실행 방법

프로젝트 클론 및 의존성 설치를 진행해주세요.

```
git clone https://github.com/TeamGuttok/front.git
cd front
npm install
```

루트 디렉토리에 `.env.local` 파일 생성 후 아래 환경 변수를 입력 해주세요.

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

백엔드 서버가 로컬에서 `http://localhost:8080`으로 실행되고 있어야 정상 작동합니다.
