# 기술 블로그

React + Vite + Tailwind CSS로 구축된 마크다운 기반 기술 블로그입니다.

## 🚀 주요 기능

- 📝 마크다운 파일 기반 블로그 포스팅
- 🏷️ 태그 필터링 시스템
- 🔍 검색 기능
- 📱 반응형 디자인
- ⚡ GitHub Actions 자동 배포

## 🛠️ 기술 스택

- **프론트엔드**: React 19, TypeScript
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS, shadcn/ui
- **라우팅**: React Router
- **마크다운**: react-markdown, gray-matter
- **배포**: GitHub Pages + GitHub Actions

## 📦 설치 및 실행

### 로컬 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

## 📝 블로그 글 작성하기

1. `articles/` 폴더에 마크다운 파일(`.md`) 생성
2. 파일 상단에 frontmatter 작성:

```markdown
---
title: '글 제목'
date: '2025-10-25'
tags: ['React', 'TypeScript']
description: '글 설명'
---

본문 내용을 여기에 작성합니다...
```

3. Git에 커밋 및 푸시:

```bash
git add articles/your-new-post.md
git commit -m "Add new blog post"
git push
```

4. GitHub Actions가 자동으로 빌드 및 배포합니다!

## 🎨 프로젝트 구조

```
blog/
├── articles/              # 마크다운 블로그 글
│   ├── welcome.md
│   └── ...
├── src/
│   ├── components/        # React 컴포넌트
│   │   ├── ui/           # UI 기본 컴포넌트
│   │   ├── Header.tsx
│   │   ├── ArticleCard.tsx
│   │   └── ...
│   ├── pages/            # 페이지 컴포넌트
│   │   ├── Home.tsx
│   │   └── Article.tsx
│   ├── lib/              # 유틸리티 함수
│   │   └── articles.ts   # 마크다운 로더
│   └── App.tsx           # 라우터 설정
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions 배포 워크플로우
└── ...
```

## 🚀 GitHub Pages 배포 설정

### 1. GitHub 저장소 설정

1. GitHub 저장소 Settings > Pages로 이동
2. Source를 "GitHub Actions"로 설정

### 2. Base Path 설정

`vite.config.ts`에서 `base` 경로 설정:

```typescript
export default defineConfig({
  base: '/blog/', // 저장소 이름이 'blog'인 경우
  // 커스텀 도메인 사용 시 '/'로 변경
})
```

### 3. 자동 배포

- `main` 브랜치에 푸시하면 자동으로 배포됩니다
- GitHub Actions 탭에서 배포 상태 확인 가능

## 📄 마크다운 기능

- GitHub Flavored Markdown 지원
- 코드 구문 강조
- 테이블, 체크리스트 등
- 자동 링크 변환

## 🎯 커스터마이징

### 블로그 제목 변경

`src/components/Header.tsx`에서 블로그 제목 수정

### 스타일 변경

Tailwind CSS 클래스로 쉽게 스타일 커스터마이징 가능

### 새 페이지 추가

1. `src/pages/`에 새 컴포넌트 생성
2. `src/App.tsx`에 라우트 추가

## 📝 라이선스

MIT
