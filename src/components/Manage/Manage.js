import React from 'react';
import fakeData from '../../fakeData';

const Manage = () => {

    const handleAddProduct=()=>{
        fetch('https://calm-peak-57009.herokuapp.com/addProduct', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(fakeData)
        })
    }

    return (
        <div>
            <button onClick={handleAddProduct} className="btn btn-primary">Add Product</button>
            
        </div>
    );
};

export default Manage;