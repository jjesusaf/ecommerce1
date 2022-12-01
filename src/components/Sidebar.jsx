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
                            <li key={cart1.id}>
                                <span>
                                    {cart1.brand}
                                </span> <br />
                                <span>
                                    {cart1.title}
                                </span>
                            </li>
                        ))}
                    </div>
                </Offcanvas.Body>
                <Button onClick={()=> dispatch(checkoutCartThunk())}>
                    Checkout
                </Button>
            </Offcanvas>
        </div>
    );
};

export default Sidebar;