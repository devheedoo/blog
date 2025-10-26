import type { Article } from '@/types/Article'
import matter from 'gray-matter'

// Vite의 import.meta.glob을 사용하여 모든 마크다운 파일 로드
const articleModules = import.meta.glob('../../articles/*.md', {
  eager: false,
  as: 'raw',
})

let articlesCache: Article[] | null = null

export async function loadAllArticles(): Promise<Article[]> {
  if (articlesCache) {
    return articlesCache
  }

  const articles: Article[] = []

  for (const path in articleModules) {
    const rawContent = (await articleModules[path]()) as string
    const { data, content } = matter(rawContent)

    // 파일명에서 slug 추출
    const slug = path.split('/').pop()?.replace('.md', '') || ''

    articles.push({
      slug,
      title: data.title || slug,
      date: data.date || '',
      tags: data.tags || [],
      description: data.description || '',
      content,
    })
  }

  // 날짜 기준 내림차순 정렬
  articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  articlesCache = articles
  return articles
}

export async function loadArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await loadAllArticles()
  return articles.find((article) => article.slug === slug) || null
}

export function getAllTags(articles: Article[]): string[] {
  const tagSet = new Set<string>()
  articles.forEach((article) => {
    article.tags.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

export function filterArticles(
  articles: Article[],
  searchQuery: string,
  selectedTags: string[],
): Article[] {
  return articles.filter((article) => {
    // 검색어 필터
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())

    // 태그 필터
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => article.tags.includes(tag))

    return matchesSearch && matchesTags
  })
}
