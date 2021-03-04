import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const[cart,setCart]=useState([]);
    useEffect(()=>{

        const saveCart = getDatabaseCart();
        const productKey=Object.keys(saveCart);

        const cartProducts=productKey.map(key=>{
            const product= fakeData.find(pd=>pd.key===key);
            product.quantity=saveCart[key];
            return product;
        });
        setCart(cartProducts);

        
    });
    return (
        <div>
            <h1>Cart Items{cart.length} </h1>
            {
                cart.map(pd=><ReviewItem 
                    key={pd.key}
                    product={pd}>

                    </ReviewItem>)
            }

        </div>
    );
};

export default Review;