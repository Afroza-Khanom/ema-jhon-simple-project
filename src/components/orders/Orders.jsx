import React, { useState } from 'react';
import Cart from '../cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../reviewItem/ReviewItem';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart)

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    // console.log(savedCart.length)

    const handleClearCart = ()=>{
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='review-container'>
            {
                cart.map(product => <ReviewItem key={product.id} product={product}
                    handleRemoveFromCart={handleRemoveFromCart}></ReviewItem>)
            }

            </div>
            <div className='cart-container'>
                <Cart cart={cart}
                handleClearCart={handleClearCart}></Cart>   
                {/* cart={[]} eta cart er array ta ke loop korbe just empty array thakai empty dekhabe but jdi na di  tahole error dbe */}
            </div>
        </div>
    );
};

export default Orders;