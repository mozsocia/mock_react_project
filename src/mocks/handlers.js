import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/categories',async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return HttpResponse.json([
      { id: 1, name: 'Electronics', description: 'Smartphones, laptops, and other gadgets' },
      { id: 2, name: 'Clothing', description: 'Men\'s and women\'s apparel' },
      { id: 3, name: 'Books', description: 'Fiction, non-fiction, and educational resources' },
      { id: 4, name: 'Home & Garden', description: 'Furniture, decor, and gardening supplies' },
      { id: 5, name: 'Sports', description: 'Equipment for various sports and outdoor activities' }
    ])
  })
]
