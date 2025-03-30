import { http, HttpResponse } from 'msw'

export const categoryHandlers = [
  http.get('/categories', async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return HttpResponse.json([
      { id: 1, name: 'Electronics', description: 'Smartphones, laptops, and other gadgets' },
      { id: 2, name: 'Clothing', description: 'Men\'s and women\'s apparel' },
      { id: 3, name: 'Books', description: 'Fiction, non-fiction, and educational resources' },
      { id: 4, name: 'Home & Garden', description: 'Furniture, decor, and gardening supplies' },
      { id: 5, name: 'Sports', description: 'Equipment for various sports and outdoor activities' }
    ])
  }),

  http.post('/categories', async ({ request }) => {
    const category = await request.json()
    return HttpResponse.json({ ...category, id: Math.random() }, { status: 201 })
  }),

  http.get('/categories/:id', ({ params }) => {
    const { id } = params
    const category = [
      { id: 1, name: 'Electronics', description: 'Smartphones, laptops, and other gadgets' },
      { id: 2, name: 'Clothing', description: 'Men\'s and women\'s apparel' },
      { id: 3, name: 'Books', description: 'Fiction, non-fiction, and educational resources' },
      { id: 4, name: 'Home & Garden', description: 'Furniture, decor, and gardening supplies' },
      { id: 5, name: 'Sports', description: 'Equipment for various sports and outdoor activities' }
    ].find(cat => cat.id === Number(id))

    if (!category) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(category)
  }),

  http.put('/categories/:id', async ({ request, params }) => {
    const updates = await request.json()
    const { id } = params
    return HttpResponse.json({ id: Number(id), ...updates })
  }),

  http.delete('/categories/:id', ({ params }) => {
    return new HttpResponse(null, { status: 204 })
  })
]