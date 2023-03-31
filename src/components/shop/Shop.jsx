import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
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

    useEffect(()=>{
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step 1 get id of the addedProduct
        for(const id in storedCart){
            //step 2 get the product by using id
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct){
                // step 3 add quantity 
                const quantity = storedCart[id];
                addedProduct.quantity= quantity;
                // step 4 add the added product to saved cart
                savedCart.push(addedProduct);
            }
            // step 5 set the cart
            setCart(savedCart);

            
        }
    },[products])

    const handleAddtoCart = (product) =>{
        // cart.push(product) notmally js e evbe cart e item add kra jeto
        const newCart = [...cart, product];  //react e new array ready kore then add krte hoi
        setCart(newCart)
        addToDb(product.id)
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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;