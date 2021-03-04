import React, { useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const first10=fakeData.slice(0,10);
    const [products, setProduct] = useState(first10);
    const [cart,setCart]=useState([]);
    const handleAddProduct=(product)=>{
        const newCart=[...cart,product];
        setCart(newCart);
        const sameProduct=newCart.filter(pd=>pd.key===product.key);
        const count=sameProduct.length;
        addToDatabaseCart(product.key,count);

    }
    
    return (
        <div className="shop-container container">
            <div className="product-container m-5">
                {
                    products.map(pd=><Product 
                    key={pd.key}    
                    showAddToCard={true}    
                    handleAddProduct={handleAddProduct} 
                    product={pd}>
                    </Product>)
                }
            </div>
            <div className="card-container">
                <Cart cart={cart}></Cart>
            </div>
            
            
        </div>
    );
};

export default Shop;