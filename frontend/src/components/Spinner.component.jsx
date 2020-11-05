import React from 'react';
import Loader from "./Loader.component";
import Message from "./Message.component";

const Spinner = ({loading, error, children}) => {
    return (
        <>
            {loading ? <Loader/> : error ? (<Message variant='danger'>{error}</Message>) : {children}}
        </>
    );
};

export default Spinner;
