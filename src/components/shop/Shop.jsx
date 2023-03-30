import React, { useEffect, useState } from 'react';
import Product from '../product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    const handleAddtoCart = (product) =>{
        // cart.push(product) notmally js e evbe cart e item add kra jeto
        const newCart = [...cart, product];  //react e new array ready kore then add krte hoi
        setCart(newCart)
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product key={product.id}
                    product={product}
                    handleAddtoCart={handleAddtoCart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <h4>Order summary</h4>
                <p>Selected Items: {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;