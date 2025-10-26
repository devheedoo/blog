---
title: 'TypeScript 실전 팁 10가지'
date: '2025-10-23'
tags: ['TypeScript', 'JavaScript', '개발팁']
description: 'TypeScript를 더 효과적으로 사용하기 위한 실전 팁들을 소개합니다.'
---

# TypeScript 실전 팁 10가지

TypeScript를 사용하면서 알아두면 유용한 팁들을 정리했습니다.

## 1. Union Types 활용

```typescript
type Status = 'success' | 'error' | 'loading'

function handleStatus(status: Status) {
  switch (status) {
    case 'success':
      console.log('성공!')
      break
    case 'error':
      console.log('에러 발생')
      break
    case 'loading':
      console.log('로딩 중...')
      break
  }
}
```

## 2. Utility Types 사용

TypeScript는 다양한 유틸리티 타입을 제공합니다.

```typescript
interface User {
  id: number
  name: string
  email: string
  age: number
}

// Partial: 모든 속성을 선택적으로
type PartialUser = Partial<User>

// Pick: 특정 속성만 선택
type UserPreview = Pick<User, 'id' | 'name'>

// Omit: 특정 속성 제외
type UserWithoutEmail = Omit<User, 'email'>
```

## 3. Type Guards

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function process(value: string | number) {
  if (isString(value)) {
    // 여기서 value는 string 타입
    console.log(value.toUpperCase())
  } else {
    // 여기서 value는 number 타입
    console.log(value.toFixed(2))
  }
}
```

## 4. Generic 함수

```typescript
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0]
}

const numbers = [1, 2, 3]
const first = getFirstElement(numbers) // number | undefined

const strings = ['a', 'b', 'c']
const firstStr = getFirstElement(strings) // string | undefined
```

## 5. readonly 사용

```typescript
interface Config {
  readonly apiUrl: string
  readonly timeout: number
}

const config: Config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
}

// config.apiUrl = 'new url'; // 에러!
```

## 6. as const 활용

```typescript
const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
} as const

type Route = (typeof routes)[keyof typeof routes]
// Route = "/" | "/about" | "/contact"
```

## 7. Discriminated Unions

```typescript
type Success = {
  status: 'success'
  data: string
}

type Error = {
  status: 'error'
  error: string
}

type Result = Success | Error

function handleResult(result: Result) {
  if (result.status === 'success') {
    console.log(result.data) // data 속성 접근 가능
  } else {
    console.log(result.error) // error 속성 접근 가능
  }
}
```

## 8. satisfies 연산자

```typescript
type Color = 'red' | 'green' | 'blue'

const palette = {
  primary: 'red',
  secondary: 'green',
} satisfies Record<string, Color>

// palette의 정확한 타입이 유지됨
palette.primary.toUpperCase() // OK
```

## 9. Template Literal Types

```typescript
type Direction = 'left' | 'right' | 'top' | 'bottom'
type Margin = `margin-${Direction}`
// "margin-left" | "margin-right" | "margin-top" | "margin-bottom"
```

## 10. Indexed Access Types

```typescript
interface User {
  profile: {
    name: string
    age: number
  }
}

type ProfileName = User['profile']['name'] // string
```

## 마치며

이러한 TypeScript 기능들을 잘 활용하면 더 안전하고 유지보수하기 좋은 코드를 작성할 수 있습니다.
