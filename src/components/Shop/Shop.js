import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import './Shop.css'
const Shop = () => {
    // const first10=fakeData.slice(0,10);
    const [products, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://calm-peak-57009.herokuapp.com/products?search=' + search)
            .then(res => res.json())
            .then(data => setProduct(data))

    }, [search])

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        fetch('https://calm-peak-57009.herokuapp.com/productsBuyKey ', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))

        // if(products.length){
        //     const previousCart=productKeys.map(existingKey=>{
        //         const product= products.find(pd=>pd.key===existingKey);
        //         product.quantity=saveCart[existingKey];
        //         return product;
        //     })
        //     setCart(previousCart);
        // }

    }, []);
    const handleSearch = event => {
        setSearch(event.target.value);
    }
    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);

        addToDatabaseCart(product.key, count);

    }

    return (
        <div className="twin-container container">
            <div className="product-container m-5">
                <div className="d-flex w-75 content-align-center">
                <input className="form-control" type="text" onBlur={handleSearch} placeholder="search product" />
                <button className="btn btn-primary">Search</button>

                </div>
                {
                    products.length === 0 &&
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                }
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCard={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="btn btn-warning border">Review your Products</button>
                    </Link>
                </Cart>
            </div>


        </div>
    );
};

export default Shop;