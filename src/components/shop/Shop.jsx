import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

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
        let newCart = [];
        // const newCart = [...cart, product];  //react e new array ready kore then add krte hoi

        // if product doesn't exist in the cart, then set qunatity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd.id === product.id)
        if(!exists){
            product.quantity = 1;
            newCart=[...cart, product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }
        setCart(newCart)
        addToDb(product.id)
    }

    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
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
                <Cart cart={cart}
                handleClearCart ={handleClearCart}>
                    <Link to="/orders">
                        <button className='btn-proced'>Review order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;