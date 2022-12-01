import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';
import { checkoutCartThunk } from '../store/slices/cart.slice';

const Sidebar = ({ handleClose, show }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    const cart = useSelector(state => state.cart)

    console.log(cart)
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        {cart.map(cart1 => (
                            <li className='licart' key={cart1.id}>
                                <div className='productsincart'>
                                <span>
                                    {cart1?.brand}
                                </span>
                                <span>
                                    {cart1?.title}
                                </span>
                                <span>
                                    {cart1?.productsInCart?.quantity}
                                </span>
                                <span>
                                    Total : $ {parseInt(cart1?.price) * cart1?.productsInCart?.quantity }
                                </span>
                                </div> 
                            </li>
                        ))}
                    </div>
                </Offcanvas.Body>
                <Button className='btn-checkout' onClick={()=> dispatch(checkoutCartThunk())}>
                    Checkout
                </Button>
            </Offcanvas>
        </div>
    );
};

export default Sidebar;