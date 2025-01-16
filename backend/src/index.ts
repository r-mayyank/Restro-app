import { Hono } from 'hono'
import { cors } from 'hono/cors'
import user from './routes/user'
import attendance from './routes/attendance'
import menurouter from './routes/menuroutes'
import categoryRouter from './routes/categoryroutes'
import customerrouter from './routes/customerroutes'
import orderrouter from './routes/orderroutes'
import restaurant from './routes/restaurant'
import table from './routes/table'
import kot from './controllers/kotcontrollers'

const app = new Hono()

app.use('/*', cors())

app.get('/health', (c) => {
  return c.text('Hello From Backend!')
})

app.route('/api/v1/user', user)
app.route('/api/v1/user/attendance', attendance)
app.route('/api/v1/restaurant', restaurant)
app.route('/api/v1/table', table)
app.route('/api/v1/kot', kot)
app.route("/api/menu-items", menurouter);
app.route("/api/categories", categoryRouter);
app.route("/api/customers", customerrouter);
app.route("/api/orders", orderrouter);

export default app;