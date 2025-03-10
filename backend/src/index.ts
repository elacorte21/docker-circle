import express from 'express'
import booksRouter from './router/booksRouter'
import { errorHandler } from './middleware/errorHandler'
import ErrorHandler from './utils/ErrorHandler'
import cors from 'cors'

const app = express()
const port = 4000

// CORS setup
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json())
app.use(cors(corsOptions));

app.use('/books', booksRouter)

app.use((_req, _res, next) => {
    next(new ErrorHandler('Route not found', 404))
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`🚀 Example app listening at http://localhost:${port}`)
})
