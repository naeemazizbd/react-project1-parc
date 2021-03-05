import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,img,key,price}=props.product;

    return (
        <div className="border-bottom shadow m-4 p-3">
            
            <h4>{name}</h4>
            <img src={img} alt=""/>
            <p>Quantity: {quantity}</p>
            <p className="">${price}</p>
            <br/>

            <button onClick={()=>props.removeProduct(key)} className="btn btn-warning">Remove</button>
            
        </div>
    );
};

export default ReviewItem;