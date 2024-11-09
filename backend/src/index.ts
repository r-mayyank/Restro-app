import { Hono } from 'hono'
import { cors } from 'hono/cors'
import user from './routes/user'
import attendance from './routes/attendance'

import menuroutes from './routes/menuroutes.js';
import categoryroutes from './routes/categoryroutes.js';
import customerroutes from './routes/customerroutes.js';
import orderroutes from './routes/orderroutes.js';

const app = new Hono()

app.use('/*', cors())

app.get('/health', (c) => {
  return c.text('Hello From Backend!')
})

app.route('/api/v1/user', user)
app.route('/api/v1/user/attendance', attendance)
app.use('/api/menu-items', menuroutes);
app.use('/api/categories', categoryroutes);
app.use('/api/customers', customerroutes);
app.use('/api/orders', orderroutes);

export default app;