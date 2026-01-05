# 아자아자캔버스

디자인 템플릿 플랫폼 - PPT, 카드뉴스, 동영상 등 다양한 템플릿을 제공합니다.

## 프로젝트 정보

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## 기술 스택

- **Vite** - 빠른 빌드 도구
- **TypeScript** - 타입 안전성
- **React** - UI 라이브러리
- **shadcn/ui** - UI 컴포넌트
- **Tailwind CSS** - 스타일링

## 주요 파일 구조 및 기능

### 📁 페이지 (src/pages/)

| 파일 | 설명 |
|------|------|
| `Index.tsx` | 메인 홈페이지 - 히어로 섹션, 검색바, 추천 템플릿 표시 |
| `Templates.tsx` | 템플릿 목록 페이지 - 캐러셀, 타입별 카드, 추천 템플릿 그리드 |
| `Search.tsx` | 검색 결과 페이지 - 필터링, 정렬 기능 포함 |
| `NotFound.tsx` | 404 에러 페이지 |

### 📁 컴포넌트 (src/components/)

| 파일 | 설명 |
|------|------|
| `Header.tsx` | 상단 네비게이션 바 - 로고, 메뉴, 검색, 로그인 버튼 |
| `SearchBar.tsx` | 검색 입력 컴포넌트 |
| `Carousel.tsx` | 추천 템플릿 슬라이드 캐러셀 |
| `TemplateCard.tsx` | 개별 템플릿 카드 - 이미지, 제목, 좋아요 기능 |
| `TypeCards.tsx` | 타입별 분류 카드 (PPT, 카드뉴스, 포스터 등) |
| `NavLink.tsx` | 네비게이션 링크 컴포넌트 |

### 📁 데이터 및 유틸리티

| 파일 | 설명 |
|------|------|
| `src/data/templates.ts` | 템플릿 목록 데이터 |
| `src/lib/tracking.ts` | Google Sheets 연동 페이지 트래킹 |
| `src/lib/utils.ts` | 공통 유틸리티 함수 |

### 📁 스타일

| 파일 | 설명 |
|------|------|
| `src/index.css` | 전역 스타일 및 디자인 시스템 변수 |
| `tailwind.config.ts` | Tailwind CSS 설정 |

## 로컬 개발 환경 설정

Node.js와 npm이 필요합니다 - [nvm으로 설치](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# 1. 저장소 클론
git clone <YOUR_GIT_URL>

# 2. 프로젝트 폴더로 이동
cd <YOUR_PROJECT_NAME>

# 3. 의존성 설치
npm i

# 4. 개발 서버 실행
npm run dev
```

## 배포 방법

[Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID)에서 Share → Publish 클릭

## 커스텀 도메인 연결

프로젝트 설정 > Domains에서 도메인을 연결할 수 있습니다.

자세한 내용: [커스텀 도메인 설정](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

© 2025 아자아자캔버스. 모든 권리 보유.
