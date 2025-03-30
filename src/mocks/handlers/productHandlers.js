import { http, HttpResponse } from 'msw'

// Shared product state
const products = [
  {
    id: 1,
    item_code: 'P001',
    name: 'Smartphone X',
    image: 'https://picsum.photos/200/300?random=1',
    sku: 'SMX-001',
    description: 'Latest smartphone model',
    stock_quantity: 50,
    minmum_quantity: 10,
    category: 1,
    brand: 1,
    price: 799.99,
    tax: 0.1,
    purchase_price: 500,
    profit: 299.99,
    sales_price: 799.99,
    barcode: '123456789012',
    discount: 0,
    status: 'active',
    expire_date: '2025-12-31',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    item_code: 'P001',
    name: 'Smartphone X',
    image: 'https://picsum.photos/200/300?random=2',
    sku: 'SMX-001',
    description: 'Latest smartphone model',
    stock_quantity: 50,
    minmum_quantity: 10,
    category: 1,
    brand: 1,
    price: 799.99,
    tax: 0.1,
    purchase_price: 500,
    profit: 299.99,
    sales_price: 799.99,
    barcode: '123456789012',
    discount: 0,
    status: 'active',
    expire_date: '2025-12-31',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    item_code: 'P002',
    name: 'Laptop Pro',
    image: 'https://picsum.photos/200/300?random=3',
    sku: 'LTP-002',
    description: 'High-performance laptop',
    stock_quantity: 30,
    minmum_quantity: 5,
    category: 1,
    brand: 2,
    price: 1299.99,
    tax: 0.1,
    purchase_price: 900,
    profit: 399.99,
    sales_price: 1299.99,
    barcode: '987654321098',
    discount: 0.05,
    status: 'active',
    expire_date: '2025-12-31',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    item_code: 'P003',
    name: 'Wireless Headphones',
    image: 'https://picsum.photos/200/300?random=4',
    sku: 'WHP-003',
    description: 'Premium wireless headphones',
    stock_quantity: 100,
    minmum_quantity: 20,
    category: 1,
    brand: 3,
    price: 199.99,
    tax: 0.1,
    purchase_price: 120,
    profit: 79.99,
    sales_price: 199.99,
    barcode: '456789123012',
    discount: 0,
    status: 'active',
    expire_date: '2025-12-31',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    item_code: 'P004',
    name: 'Smart Watch',
    image: 'https://picsum.photos/200/300?random=5',
    sku: 'SWT-004',
    description: 'Feature-rich smartwatch',
    stock_quantity: 75,
    minmum_quantity: 15,
    category: 1,
    brand: 1,
    price: 299.99,
    tax: 0.1,
    purchase_price: 180,
    profit: 119.99,
    sales_price: 299.99,
    barcode: '789123456012',
    discount: 0.1,
    status: 'active',
    expire_date: '2025-12-31',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
]

export const productHandlers = [
  http.get('/products', async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return HttpResponse.json(products)
  }),

  http.post('/products', async ({ request }) => {
    const product = await request.json()
    const newProduct = { ...product, id: Math.random() }
    products.push(newProduct)
    return HttpResponse.json(newProduct, { status: 201 })
  }),

  http.get('/products/:id', ({ params }) => {
    const { id } = params
    const product = products.find(prod => prod.id === Number(id))

    if (!product) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(product)
  }),

  http.put('/products/:id', async ({ request, params }) => {
    const updates = await request.json()
    const { id } = params
    const index = products.findIndex(prod => prod.id === Number(id))

    if (index !== -1) {
      products[index] = { ...products[index], ...updates }
    }

    return HttpResponse.json({ id: Number(id), ...updates })
  }),

  http.delete('/products/:id', ({ params }) => {
    const { id } = params
    const index = products.findIndex(prod => prod.id === Number(id))

    if (index !== -1) {
      products.splice(index, 1)
    }

    return new HttpResponse(null, { status: 204 })
  }),
  http.get('/products/select-options', () => {
    const categories = [
      { id: 1, label: 'Electronics' },
      { id: 2, label: 'Clothing' },
      { id: 3, label: 'Books' }
    ]

    const brands = [
      { id: 1, label: 'Apple' },
      { id: 2, label: 'Samsung' },
      { id: 3, label: 'Sony' }
    ]

    const status = [
      { id: 'active', label: 'Active' },
      { id: 'inactive', label: 'Inactive' },
      { id: 'discontinued', label: 'Discontinued' }
    ]

    const options = {
      category: categories,
      brand: brands,
      status: status
    }

    return HttpResponse.json(options)
  }),
]