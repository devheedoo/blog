import { Badge } from '@/components/ui/badge'

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

export function TagFilter({ tags, selectedTags, onTagToggle }: TagFilterProps) {
  if (tags.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
        태그로 필터링
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className="transition-transform hover:scale-105"
            >
              <Badge variant={isSelected ? 'default' : 'outline'}>{tag}</Badge>
            </button>
          )
        })}
      </div>
    </div>
  )
}
