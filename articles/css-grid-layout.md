---
title: 'CSS Grid로 복잡한 레이아웃 쉽게 만들기'
date: '2025-10-22'
tags: ['CSS', 'Frontend', '웹디자인']
description: 'CSS Grid를 활용하여 반응형 레이아웃을 간단하게 구현하는 방법을 알아봅니다.'
---

# CSS Grid로 복잡한 레이아웃 쉽게 만들기

CSS Grid는 2차원 레이아웃 시스템으로, 복잡한 레이아웃을 간단하게 만들 수 있습니다.

## 기본 Grid 설정

가장 기본적인 Grid 레이아웃부터 시작해봅시다.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

이 코드는 3개의 동일한 너비의 컬럼을 가진 그리드를 만듭니다.

## 반응형 그리드

미디어 쿼리 없이도 반응형 그리드를 만들 수 있습니다.

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

`auto-fit`과 `minmax`를 조합하면 화면 크기에 따라 자동으로 컬럼 수가 조정됩니다.

## Grid Areas로 레이아웃 정의

Grid Areas를 사용하면 레이아웃을 시각적으로 정의할 수 있습니다.

```css
.layout {
  display: grid;
  grid-template-areas:
    'header header header'
    'sidebar main main'
    'footer footer footer';
  grid-template-columns: 200px 1fr 1fr;
  gap: 20px;
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
}
```

## 아이템 배치

개별 그리드 아이템의 위치를 자유롭게 조정할 수 있습니다.

```css
.item1 {
  grid-column: 1 / 3; /* 1번 라인부터 3번 라인까지 */
  grid-row: 1 / 2;
}

.item2 {
  grid-column: span 2; /* 2개의 컬럼을 차지 */
}
```

## 정렬과 배치

Grid는 강력한 정렬 기능을 제공합니다.

```css
.container {
  display: grid;
  place-items: center; /* 모든 아이템을 중앙 정렬 */
}

.container2 {
  display: grid;
  justify-items: start; /* 수평 정렬 */
  align-items: end; /* 수직 정렬 */
}
```

## 실전 예제: 카드 레이아웃

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

```html
<div class="card-grid">
  <div class="card">카드 1</div>
  <div class="card">카드 2</div>
  <div class="card">카드 3</div>
  <div class="card">카드 4</div>
</div>
```

## Grid vs Flexbox

| 특징          | Grid          | Flexbox       |
| ------------- | ------------- | ------------- |
| 차원          | 2차원         | 1차원         |
| 주 용도       | 레이아웃      | 아이템 배치   |
| 정렬          | 매우 강력함   | 강력함        |
| 브라우저 지원 | 최신 브라우저 | 모든 브라우저 |

## 유용한 팁

1. **개발자 도구 활용**: 크롬/파이어폭스의 Grid 검사 도구를 사용하세요
2. **명시적 vs 암시적 그리드**: 필요에 따라 선택하세요
3. **minmax() 활용**: 최소/최대 크기를 지정하여 더 유연한 레이아웃을 만드세요
4. **gap 속성**: margin 대신 gap을 사용하면 더 깔끔합니다

## 브라우저 지원

CSS Grid는 모든 최신 브라우저에서 지원됩니다. IE11을 지원해야 한다면 Flexbox를 고려하세요.

## 마치며

CSS Grid를 마스터하면 복잡한 레이아웃도 쉽게 구현할 수 있습니다. 직접 실습하면서 익혀보세요!
