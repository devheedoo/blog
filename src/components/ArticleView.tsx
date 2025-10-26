import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import { Badge } from '@/components/ui/badge'
import type { Article } from '@/types/Article'

// Highlight.js 테마 - 라이트/다크 모드 모두 지원하는 atom-one 테마
import 'highlight.js/styles/atom-one-dark.css'

interface ArticleViewProps {
  article: Article
}

export function ArticleView({ article }: ArticleViewProps) {
  const formattedDate = new Date(article.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="mx-auto max-w-4xl">
      <header className="mb-8 border-b pb-8">
        <h1 className="mb-4 text-4xl font-bold">{article.title}</h1>
        <div className="mb-4 text-neutral-600 dark:text-neutral-400">
          {formattedDate}
        </div>
        {article.description && (
          <p className="mb-4 text-lg text-neutral-600 dark:text-neutral-400">
            {article.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>
      <div className="prose prose-neutral dark:prose-invert max-w-none lg:prose-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
