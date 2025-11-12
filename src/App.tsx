import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavMenu, { type MenuItem } from './components/NavMenu'

function App() {
  const [count, setCount] = useState(0)
  const [active, setActive] = useState<string | undefined>('home')

  const items: MenuItem[] = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'about', label: 'About', href: '/about' },
    { key: 'blog', label: 'Blog', href: '/blog'},
    { key: 'contact', label: 'Contact', href: '/contact', disabled: false },
  ]

  return (
    <div className="App">
      <header style={{ display: 'flex', alignItems: 'center', gap: 16 }}> 
        <div>
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 style={{ margin: 0 }}>Vite + React</h1>
      </header>

      <NavMenu
        items={items}
        activeKey={active}
        onSelect={(k: string | undefined) => setActive(k)}
        orientation="horizontal"
      />

      <main style={{ padding: '1rem 0' }}>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </main>
    </div>
  )
}

export default App
