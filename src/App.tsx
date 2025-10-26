import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Home } from '@/pages/Home'
import { Article } from '@/pages/Article'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-neutral-950">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:slug" element={<Article />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
