import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

import FormContainer from "../components/FormContainer.component";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message.component";
import Loader from "../components/Loader.component";
import {listProductDetails, updateProduct} from "../redux/product/product.action";
import {PRODUCT_UPDATE_RESET} from "../redux/product/product.types";

const ProductEditPage = ({match, history}) => {
        const productID = match.params.id;
        const dispatch = useDispatch();

        const [name, setName] = useState('');
        const [price, setPrice] = useState(0);
        const [image, setImage] = useState('');
        const [brand, setBrand] = useState('');
        const [category, setCategory] = useState('');
        const [countInStock, setCountInStock] = useState(0);
        const [description, setDescription] = useState('');
        const [uploading, setUploading] = useState(false);

        const productDetails = useSelector(state => state.productDetails);
        const {loading, error, product} = productDetails;

        const productUpdate = useSelector(state => state.productUpdate);
        const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate;


        useEffect(() => {
                if (successUpdate) {
                    dispatch({type: PRODUCT_UPDATE_RESET})
                    history.push('/admin/productlist');
                } else {
                    console.log('No');
                    if (!product.name || product._id !== productID) {
                        dispatch(listProductDetails(productID));
                    } else {
                        setName(product.name);
                        setPrice(product.price);
                        setImage(product.image);
                        setBrand(product.brand);
                        setCategory(product.category);
                        setCountInStock(product.countInStock);
                        setDescription(product.description);
                    }
                }
            }, [dispatch, history, productID, product, successUpdate]
        )

        const submitHandler = (e) => {
            e.preventDefault();
            dispatch(updateProduct({
                _id: productID,
                name,
                price,
                category,
                brand,
                countInStock,
                description,
                image
            }))
        }

        const uploadFileHandler = async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image', file);
            setUploading(true)

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                const {data} = await axios.post('/api/upload', formData, config)

                setImage(data);
                setUploading(false);
            } catch (error){
                console.error(error.message);
                setUploading(false);
            }
        }

        return (
            <>
                <Link to='/admin/productlist' className='btn btn-light my-3'>
                    Go Back
                </Link>
                <FormContainer>
                    <h1>Edit Product</h1>
                    {loadingUpdate && <Loader/>}
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                    {loading
                        ? <Loader/>
                        : error
                            ? <Message variant='danger'>{error}</Message>
                            : (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='name'
                                            placeholder='Enter name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='price'>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Enter price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='price'>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter image url'
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                        />
                                        <Form.File
                                            id='image-file'
                                            label='Choose File'
                                            custom
                                            onChange={uploadFileHandler}
                                        ></Form.File>
                                        {uploading && <Loader/>}
                                    </Form.Group>
                                    <Form.Group controlId='brand'>
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter brand'
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='category'>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter category'
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='countInStock'>
                                        <Form.Label>Count In Stock</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter count in stock'
                                            value={countInStock}
                                            onChange={(e) => setCountInStock(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='description'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>
                                        Update
                                    </Button>
                                </Form>
                            )}
                </FormContainer>
            </>
        );
    }
;

export default ProductEditPage;
