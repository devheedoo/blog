import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="text-2xl font-bold hover:text-neutral-600">
          기술 블로그
        </Link>
      </div>
    </header>
  )
}
