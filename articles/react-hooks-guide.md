---
title: 'React Hooks 완벽 가이드'
date: '2025-10-24'
tags: ['React', 'Hooks', 'JavaScript']
description: 'React Hooks의 기본부터 고급 활용법까지 알아봅니다.'
---

# React Hooks 완벽 가이드

React Hooks는 함수형 컴포넌트에서 상태와 생명주기 기능을 사용할 수 있게 해주는 강력한 기능입니다.

## useState

가장 기본적인 Hook인 `useState`를 먼저 살펴보겠습니다.

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  )
}
```

## useEffect

`useEffect`는 부수 효과를 처리하는 Hook입니다.

```jsx
import { useEffect, useState } from 'react'

function DataFetcher() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then((response) => response.json())
      .then((data) => setData(data))
  }, []) // 빈 배열: 컴포넌트 마운트 시에만 실행

  return <div>{data ? JSON.stringify(data) : '로딩 중...'}</div>
}
```

## 커스텀 Hook

재사용 가능한 로직을 커스텀 Hook으로 만들 수 있습니다.

```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
```

## 주의사항

1. **Hook은 최상위에서만 호출**: 조건문이나 반복문 안에서 호출하면 안 됩니다
2. **React 함수에서만 호출**: 일반 JavaScript 함수에서는 사용할 수 없습니다
3. **의존성 배열 관리**: useEffect의 의존성 배열을 정확히 관리해야 합니다

## 결론

React Hooks를 잘 활용하면 더 깔끔하고 재사용 가능한 코드를 작성할 수 있습니다.
