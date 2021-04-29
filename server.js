import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'


import userRoutes from './routes/userRoutes.js'


dotenv.config()

connectDB()

const app = express();

app.use(express.json())

app.use('/api/v1/users', userRoutes)



const PORT = process.env.PORT || 5000
app.listen( PORT , console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT} ` ));