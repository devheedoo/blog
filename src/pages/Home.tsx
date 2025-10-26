import { useEffect, useState } from 'react'
import { ArticleCard } from '@/components/ArticleCard'
import { TagFilter } from '@/components/TagFilter'
import { Input } from '@/components/ui/input'
import {
  loadAllArticles,
  getAllTags,
  filterArticles,
  type Article,
} from '@/lib/articles'

export function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [allTags, setAllTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAllArticles()
      .then((loadedArticles) => {
        setArticles(loadedArticles)
        setFilteredArticles(loadedArticles)
        setAllTags(getAllTags(loadedArticles))
      })
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    const filtered = filterArticles(articles, searchQuery, selectedTags)
    setFilteredArticles(filtered)
  }, [articles, searchQuery, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-neutral-500">로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-6 text-4xl font-bold">모든 글</h1>
        <Input
          type="text"
          placeholder="글 제목 또는 설명으로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-6"
        />
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
        />
      </div>

      {filteredArticles.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-neutral-500">
            {articles.length === 0
              ? '아직 작성된 글이 없습니다.'
              : '검색 결과가 없습니다.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
