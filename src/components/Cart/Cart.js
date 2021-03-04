import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props,price) => {
    const Cart =props.cart;
    //const total=Cart.reduce ((total,prd)=>total+prd.price,0);
    let total=0;
    for (let i=0;i<Cart.length; i++){
        const product=Cart[i];
        total=total+product.price;
    }

    let shipping=0;
    if(total>35){
        shipping=0;
    }
    else if(total>15){
        shipping=4.99;
    }
    else if (total>0){
        shipping=12.99
    }
    const tex=(total/10);
    const grandTotal=(total+shipping+Number(tex)).toFixed(2);
    const formatNumber =num=>{
        const precision=num.toFixed(2);
        return Number(precision);
    }

    return (
        <div className="text-start bg-light shadow p-3 mt-5 fixed sticky-top">
            <h5>Order Summary</h5>
            <p>Items Order: {Cart.length}</p>
            <p>Price: {formatNumber(total)} </p>
            <p>Shipping Cost: {shipping}</p>
            <p>Tex: {formatNumber(tex)}</p>
            <p>Total: {grandTotal}</p>
            <Link to="/review">
            <button className="btn btn-warning">Order your Products</button>
            </Link>



        </div>
    );
};

export default Cart;