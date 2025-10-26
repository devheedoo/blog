---
title: 'JavaScript async/await 패턴과 에러 처리'
date: '2025-10-21'
tags: ['JavaScript', '비동기', '에러처리']
description: 'async/await를 효과적으로 사용하는 패턴과 에러 처리 방법을 알아봅니다.'
---

# JavaScript async/await 패턴과 에러 처리

비동기 프로그래밍은 JavaScript의 핵심입니다. async/await를 올바르게 사용하는 방법을 알아봅시다.

## 기본 async/await

```javascript
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`)
  const user = await response.json()
  return user
}

// 사용
const user = await fetchUser(123)
console.log(user)
```

## 에러 처리 패턴

### 1. try-catch 사용

가장 일반적인 방법입니다.

```javascript
async function fetchUserWithError(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const user = await response.json()
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw error
  }
}
```

### 2. 에러 래퍼 함수

에러 처리를 간소화하는 유틸리티 함수입니다.

```javascript
async function to(promise) {
  try {
    const data = await promise
    return [null, data]
  } catch (error) {
    return [error, null]
  }
}

// 사용
const [error, user] = await to(fetchUser(123))
if (error) {
  console.error('Error:', error)
  return
}
console.log('User:', user)
```

## 병렬 처리

### Promise.all로 동시 실행

```javascript
async function fetchMultipleUsers(userIds) {
  const promises = userIds.map((id) => fetchUser(id))
  const users = await Promise.all(promises)
  return users
}

// 사용
const users = await fetchMultipleUsers([1, 2, 3, 4, 5])
```

### Promise.allSettled로 안전한 병렬 처리

하나가 실패해도 다른 것들은 계속 처리됩니다.

```javascript
async function fetchMultipleUsersSafely(userIds) {
  const promises = userIds.map((id) => fetchUser(id))
  const results = await Promise.allSettled(promises)

  const successful = results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value)

  const failed = results
    .filter((result) => result.status === 'rejected')
    .map((result) => result.reason)

  return { successful, failed }
}
```

## 순차 처리

때로는 순차적으로 처리해야 할 때가 있습니다.

```javascript
async function processSequentially(items) {
  const results = []

  for (const item of items) {
    const result = await processItem(item)
    results.push(result)
  }

  return results
}

// reduce를 사용한 방법
async function processSequentiallyWithReduce(items) {
  return await items.reduce(async (promiseChain, item) => {
    const results = await promiseChain
    const result = await processItem(item)
    return [...results, result]
  }, Promise.resolve([]))
}
```

## 타임아웃 처리

```javascript
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms),
  )
  return Promise.race([promise, timeout])
}

// 사용
try {
  const user = await withTimeout(fetchUser(123), 5000)
  console.log(user)
} catch (error) {
  if (error.message === 'Timeout') {
    console.error('Request timed out')
  }
}
```

## 재시도 로직

```javascript
async function retry(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise((resolve) => setTimeout(resolve, delay))
      console.log(`Retry ${i + 1}/${maxRetries}`)
    }
  }
}

// 사용
const user = await retry(() => fetchUser(123), 3, 2000)
```

## 캐싱 패턴

```javascript
class ApiCache {
  constructor() {
    this.cache = new Map()
  }

  async fetch(key, fetcher, ttl = 60000) {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data
    }

    const data = await fetcher()
    this.cache.set(key, { data, timestamp: Date.now() })
    return data
  }
}

const cache = new ApiCache()
const user = await cache.fetch('user:123', () => fetchUser(123))
```

## 실전 예제: API 클라이언트

```javascript
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  async get(endpoint) {
    return this.request(endpoint)
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

// 사용
const api = new ApiClient('https://api.example.com')
const user = await api.get('/users/123')
```

## 주의사항

1. **Top-level await**: 모듈 최상위에서 await 사용 가능 (최신 환경)
2. **병렬 vs 순차**: 성능을 위해 가능한 병렬 처리를 고려하세요
3. **에러 전파**: catch에서 에러를 다시 throw하거나 적절히 처리하세요
4. **메모리 누수**: 오래된 Promise를 계속 참조하지 않도록 주의하세요

## 마치며

async/await를 잘 활용하면 비동기 코드를 동기 코드처럼 직관적으로 작성할 수 있습니다!
