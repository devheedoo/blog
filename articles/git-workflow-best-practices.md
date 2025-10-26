---
title: 'Git 브랜치 전략과 협업 베스트 프랙티스'
date: '2025-10-20'
tags: ['Git', '협업', '개발프로세스']
description: '효율적인 Git 워크플로우와 팀 협업을 위한 브랜치 전략을 알아봅니다.'
---

# Git 브랜치 전략과 협업 베스트 프랙티스

효과적인 Git 사용은 팀 협업의 핵심입니다. 실무에서 사용하는 Git 전략들을 알아봅시다.

## Git Flow vs GitHub Flow

### Git Flow

전통적이고 체계적인 브랜치 전략입니다.

```bash
# 메인 브랜치
main (production)
develop (개발)

# 보조 브랜치
feature/* (기능 개발)
release/* (릴리스 준비)
hotfix/* (긴급 수정)
```

**장점**: 명확한 구조, 대규모 프로젝트에 적합

**단점**: 복잡함, 소규모 팀에는 과할 수 있음

### GitHub Flow

더 단순하고 민첩한 전략입니다.

```bash
main (production)
feature/* (모든 개발)
```

**장점**: 단순함, 빠른 배포에 적합

**단점**: 복잡한 릴리스 관리가 어려움

## 커밋 메시지 컨벤션

### Conventional Commits

```bash
# 형식
<type>(<scope>): <subject>

<body>

<footer>
```

### 타입 종류

```bash
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 코드 추가/수정
chore: 빌드 프로세스, 도구 설정 등
```

### 예시

```bash
feat(auth): 소셜 로그인 기능 추가

카카오, 네이버, 구글 소셜 로그인 구현
- OAuth 2.0 프로토콜 사용
- 사용자 정보 동기화 로직 추가

Closes #123
```

## 효과적인 브랜치 관리

### 브랜치 네이밍

```bash
# 기능 개발
feature/user-authentication
feature/payment-integration

# 버그 수정
bugfix/login-error
bugfix/payment-calculation

# 핫픽스
hotfix/security-patch
hotfix/critical-bug

# 릴리스
release/v1.2.0
release/2025-10-20
```

### 브랜치 생성과 전환

```bash
# 새 브랜치 생성 및 전환
git checkout -b feature/new-feature

# 또는 최신 방식
git switch -c feature/new-feature

# 원격 브랜치 추적
git checkout -b feature/new-feature origin/feature/new-feature
```

## Pull Request 베스트 프랙티스

### PR 템플릿

```markdown
## 변경 사항

- 주요 변경 내용 1
- 주요 변경 내용 2

## 변경 이유

이 PR이 필요한 이유 설명

## 테스트 방법

1. 서버 실행
2. /login 페이지 접속
3. 소셜 로그인 버튼 클릭

## 스크린샷 (필요시)

## 체크리스트

- [ ] 코드 리뷰 완료
- [ ] 테스트 통과
- [ ] 문서 업데이트
- [ ] 브랜치 최신화
```

### PR 크기 관리

```bash
# 작은 PR이 좋은 PR입니다
# 기준: 변경 파일 10개 이하, 변경 줄 수 400줄 이하

# 너무 큰 PR은 나누세요
git rebase -i HEAD~5  # 커밋 분리
```

## Rebase vs Merge

### Merge (병합)

```bash
git checkout main
git merge feature/new-feature

# 특징: 히스토리 보존, 머지 커밋 생성
```

### Rebase (재배치)

```bash
git checkout feature/new-feature
git rebase main

# 특징: 선형 히스토리, 깔끔한 로그
```

### 언제 무엇을 사용할까?

- **Merge**: 공개 브랜치, 협업 중인 브랜치
- **Rebase**: 개인 브랜치, 로컬에서만 작업한 브랜치

## 실전 워크플로우

### 1. 기능 개발 시작

```bash
# 최신 코드 가져오기
git checkout main
git pull origin main

# 새 브랜치 생성
git checkout -b feature/user-profile

# 작업 진행...
```

### 2. 개발 중

```bash
# 자주 커밋하기
git add .
git commit -m "feat(profile): 프로필 이미지 업로드 구현"

# 원격에 푸시 (백업)
git push origin feature/user-profile
```

### 3. PR 준비

```bash
# main 브랜치의 최신 변경사항 반영
git checkout main
git pull origin main
git checkout feature/user-profile
git rebase main

# 또는 merge
git merge main

# 충돌 해결 후
git push origin feature/user-profile --force-with-lease
```

### 4. PR 리뷰 후 머지

```bash
# GitHub에서 Squash and Merge 또는 Rebase and Merge

# 로컬 브랜치 정리
git checkout main
git pull origin main
git branch -d feature/user-profile
```

## 유용한 Git 명령어

### 작업 임시 저장

```bash
# 현재 변경사항 임시 저장
git stash

# 임시 저장 목록 확인
git stash list

# 임시 저장 내용 적용
git stash pop

# 이름을 붙여서 저장
git stash save "WIP: 로그인 기능 작업 중"
```

### 커밋 수정

```bash
# 마지막 커밋 메시지 수정
git commit --amend

# 마지막 커밋에 파일 추가
git add forgotten-file.js
git commit --amend --no-edit

# 여러 커밋 수정 (interactive rebase)
git rebase -i HEAD~3
```

### 히스토리 탐색

```bash
# 예쁜 로그 보기
git log --oneline --graph --all

# 파일 변경 이력
git log -p filename

# 특정 내용을 포함한 커밋 찾기
git log -S "searchTerm"
```

## 협업 팁

1. **자주 Pull하기**: 충돌을 최소화합니다
2. **작은 커밋**: 리뷰하기 쉽고 롤백하기 쉽습니다
3. **의미있는 메시지**: 미래의 자신을 위해 명확하게 작성하세요
4. **코드 리뷰 적극 참여**: 서로 배우는 기회입니다
5. **브랜치 정리**: 머지된 브랜치는 즉시 삭제하세요

## Git 훅 활용

```bash
# .git/hooks/pre-commit
#!/bin/sh

# 린터 실행
npm run lint

# 테스트 실행
npm test

# 실패하면 커밋 중단
if [ $? -ne 0 ]; then
  echo "Tests must pass before commit!"
  exit 1
fi
```

## 마치며

좋은 Git 습관은 팀의 생산성을 크게 향상시킵니다. 꾸준히 실천하며 익혀나가세요!
