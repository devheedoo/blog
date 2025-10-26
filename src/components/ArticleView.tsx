import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { Badge } from '@/components/ui/badge'
import type { Article } from '@/types/Article'

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
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-code:rounded prose-code:bg-neutral-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-[''] dark:prose-code:bg-neutral-800 prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-800">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
