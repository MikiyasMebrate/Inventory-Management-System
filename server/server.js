const express = require('express')
require('dotenv').config()
const connectDb = require('./config/dbConnection')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors');

connectDb() //connect database
const app = express()

//middlewares
app.use(cors({ origin: '*' })); // Allow all origins for development

app.use(express.json()) // for req.body
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/category', require('./routes/categoryRoutes'))
app.use('/api/product', require('./routes/productRoutes'))
app.use('/api/inventory-transactions', require('./routes/inventoryTransactionRoutes'))
app.use('/api/search', require('./routes/searchRoutes'))
app.use('/api/notifications/preference', require('./routes/notificationPreferenceRoutes'))
app.use('/api/notifications', require('./routes/notificationRouter'))
app.use(errorHandler)



const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${server.address().port}/`)
})
