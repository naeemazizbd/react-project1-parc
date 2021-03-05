import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const[orderPlace, setOrderPlace] = useState(false);

    const handlePlaceOrder=()=>{
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }

    const[cart,setCart]=useState([]);
    const removeProduct=(productKey)=>{
       //console.log("object" , productKey);
       const newCart=cart.filter(pd=>pd.key!==productKey);
       setCart(newCart);
       removeFromDatabaseCart(productKey)
    }

    useEffect (()=>{
        const saveCart = getDatabaseCart();
        const productKey=Object.keys(saveCart);
        const cartProducts=productKey.map(key=>{
            const product= fakeData.find(pd=>pd.key===key);
            product.quantity=saveCart[key];
            return product;
        });
        setCart(cartProducts);
    },[]);

    let thankYou;
    if(orderPlace){
        thankYou= <img src={happyImage} alt=""/>
    }

    return (
        <div className="twin-container container">
            <div className="product-container">
            {
            cart.map(pd=><ReviewItem 
                key={pd.key}
                removeProduct={removeProduct}
                product={pd}
               >
                </ReviewItem>)
            }
            {thankYou}
            </div>
            <div className="cart-container sticky-top"></div>
             <Cart cart={cart}>
                 <button onClick={handlePlaceOrder} className="btn btn-warning">Order Now</button>
             </Cart>
        </div>
    );
};

export default Review;