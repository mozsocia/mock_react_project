import { categoryHandlers } from './handlers/categoryHandlers'
import { productHandlers } from './handlers/productHandlers'

export const handlers = [ 
  ...categoryHandlers,
  ...productHandlers
]
