import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Row} from "react-bootstrap";
import Product from "../components/Product.component";

import {listProducts} from "../redux/product/product.action";
import Loader from "../components/Loader.component";
import Message from "../components/Message.component";

const HomePage = () => {

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;


    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <h1>Latest Products</h1>
            {loading
                ? (<Loader/>)
                : (error ? (<Message variant='danger'>{error}</Message>)
                    :
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>)
            }
        </>
    );
};

export default HomePage;