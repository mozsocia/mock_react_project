import { http, HttpResponse } from 'msw'

// Shared category state
const categories = [
  { 
    id: 1, 
    name: 'Electronics', 
    description: 'Smartphones, laptops, and other gadgets',
    status: 'active',
    parent: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 2, 
    name: 'Clothing', 
    description: 'Men\'s and women\'s apparel',
    status: 'active',
    parent: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    description: 'Furniture, appliances, and more',
    status: 'active',
    parent: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
{
    id: 4,
    name: 'Books & Media',
    description: 'Books, movies, music and games',
    status: 'active',
    parent: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Sports & Outdoors',
    description: 'Athletic equipment and outdoor gear',
    status: 'active',
    parent: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 6,
    name: 'Beauty & Health',
    description: 'Cosmetics, personal care and wellness products',
    status: 'active',
    parent: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

]

export const categoryHandlers = [
  http.get('/categories', async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return HttpResponse.json(categories)
  }),

  http.post('/categories', async ({ request }) => {
    const category = await request.json()
    const newCategory = { ...category, id: Math.random() }
    categories.push(newCategory)
    return HttpResponse.json(newCategory, { status: 201 })
  }),

  http.get('/categories/:id', ({ params }) => {
    const { id } = params
    const category = categories.find(cat => cat.id === Number(id))

    if (!category) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(category)
  }),

  http.put('/categories/:id', async ({ request, params }) => {
    const updates = await request.json()
    const { id } = params
    const index = categories.findIndex(cat => cat.id === Number(id))
    
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates }
    }
    
    return HttpResponse.json({ id: Number(id), ...updates })
  }),

  http.delete('/categories/:id', ({ params }) => {
    const { id } = params
    const index = categories.findIndex(cat => cat.id === Number(id))
    
    if (index !== -1) {
      categories.splice(index, 1)
    }
    
    return new HttpResponse(null, { status: 204 })
  })
]