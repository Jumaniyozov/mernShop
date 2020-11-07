import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Row} from "react-bootstrap";
import Product from "../components/Product.component";

import {listProducts} from "../redux/product/product.action";
import Loader from "../components/Loader.component";
import Message from "../components/Message.component";
import Paginate from "../components/Paginate.component";
import ProductCarousel from "../components/ProductCarousel.comonent";
import Meta from "./Meta.component";

const HomePage = ({match}) => {
    const keyword = match.params.keyword;

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const {loading, error, products, page, pages} = productList;


    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta/>
            {!keyword && <ProductCarousel/>}
            <h1>Latest Products</h1>
            {loading
                ? (<Loader/>)
                : (error ? (<Message variant='danger'>{error}</Message>)
                        : (
                            <>
                                <Row>
                                    {products.map(product => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product}/>
                                        </Col>
                                    ))}
                                </Row>
                                <Paginate keyword={keyword ? keyword : ''} pages={pages} page={page} />
                            </>
                        )
                )
            }
        </>
    );
};

export default HomePage;
