import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArticleView } from '@/components/ArticleView'
import { Button } from '@/components/ui/button'
import { loadArticleBySlug, type Article } from '@/lib/articles'
import { ArrowLeft } from 'lucide-react'

export function Article() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) {
      setNotFound(true)
      setIsLoading(false)
      return
    }

    loadArticleBySlug(slug)
      .then((loadedArticle) => {
        if (loadedArticle) {
          setArticle(loadedArticle)
        } else {
          setNotFound(true)
        }
      })
      .finally(() => setIsLoading(false))
  }, [slug])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-neutral-500">로딩 중...</p>
      </div>
    )
  }

  if (notFound || !article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">글을 찾을 수 없습니다</h1>
        <p className="mb-8 text-neutral-600">
          요청하신 글이 존재하지 않습니다.
        </p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft />
          홈으로 돌아가기
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="mb-8 inline-block">
        <Button variant="ghost" size="sm">
          <ArrowLeft />
          목록으로
        </Button>
      </Link>
      <ArticleView article={article} />
    </div>
  )
}
