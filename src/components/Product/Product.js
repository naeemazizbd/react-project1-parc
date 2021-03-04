import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { img, name, seller, price, stock,key } = props.product;
    return (
        <div className="product  d-flex bg-light m-2 shadow text-start">
            <div className="m-1  p-2 ">
                <img className="bg-light" src={img} alt="" />

            </div>
            <div className="m-1  ">
                <h5 className="text-primary"> <Link to={"/product/"+key}>{name}</Link>  </h5>
                <p>By: {seller}</p>
                <h4>Price: ${price}</h4>
                <p>Stock: {stock} only left in stock</p>
                {props.showAddToCard && <button onClick={()=>props.handleAddProduct(props.product)} className="btn btn-warning"><FontAwesomeIcon icon={faShoppingCart} /> Add to card</button> }
            </div>

        </div>
    );
};

export default Product;