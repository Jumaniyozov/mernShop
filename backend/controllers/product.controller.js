import asyncHandler from 'express-async-handler';
import Product from "../models/Product.model.js";


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    res.json(products);
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not found');
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found');
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        // name:
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})


const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body;

    const product = await Product.findById(req.params.id);
    if(product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product Not Found')
    }
})

export {getProducts, getProductById, deleteProduct, createProduct, updateProduct}
