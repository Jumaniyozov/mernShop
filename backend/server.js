import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import {notFound, errorHandler} from "./middlewares/error.middleware.js";

import productRoutes from './routes/product.route.js';
import connectDB from "./config/db.js";

dotenv.config();


const app = express();
connectDB();


app.get('/', (req, res) => {
    res.send('API is running');
})

app.use('/api/products', productRoutes);

// middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);
})
