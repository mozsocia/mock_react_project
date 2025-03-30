import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Function to fetch categories
    const fetchCategories = async () => {
      try {
        setLoading(true)
        // API endpoint - will be intercepted by MSW in development
        const response = await axios.get('https://api.example.com/categories')
        setCategories(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch categories: ' + err.message)
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) return <div>Loading categories...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="categories-container">
      <h2>Available Categories</h2>
      {categories.length === 0 ? (
        <p>No categories found</p>
      ) : (
        <ul className="categories-list">
          {categories.map(category => (
            <li key={category.id} className="category-item">
              <h3>{category.name}</h3>
              {category.description && <p>{category.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CategoriesList
