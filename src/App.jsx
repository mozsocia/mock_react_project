import React from 'react'
import CategoriesList from './components/CategoriesList'

function App() {
  return (
    <div className="app">
      <header>
        <h1>Categories Explorer</h1>
        <p>Browse and discover our product categories</p>
      </header>
      <main>
        <CategoriesList />
      </main>
    </div>
  )
}

export default App
