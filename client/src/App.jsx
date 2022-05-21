import { Routes, Route, Link } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <main>
          <Routes>
            <Route index element={<div>Homepage</div>} />
          </Routes>
        </main>
      </header>
    </div>
  )
}

export default App
