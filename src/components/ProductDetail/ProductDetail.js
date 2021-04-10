import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey}=useParams();
    const [product, setProduct]= useState({})

    useEffect(()=>{
        fetch('https://calm-peak-57009.herokuapp.com/product/'+productKey)
       .then(res=>res.json())
       .then(data=> setProduct(data))
        
    },[productKey])
    //const product= fakeData.find(pd=>pd.key===productKey);

    return (
        <div>
            <h1>Your product description</h1>
            <Product 
            showAddToCard={false} 
            product={product}>

            </Product>
        </div>
    );
};

export default ProductDetail;