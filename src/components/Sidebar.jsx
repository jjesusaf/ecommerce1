import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
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
                    {cart.map(cart1 => (
                        <Card border="success" style={{ width: '18rem' }} className='cardSidebar'>
                            <Card.Header>{cart1?.brand}</Card.Header>
                            <Card.Body>
                                <Card.Title>{cart1?.title}</Card.Title>
                                <div className='cart'>
                                    <span className='cartQuantity'>
                                        {cart1?.productsInCart?.quantity}
                                    </span>
                                    <span>
                                        Total : $ {parseInt(cart1?.price) * cart1?.productsInCart?.quantity}
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </Offcanvas.Body>
                <Button className='btn-checkout' onClick={() => dispatch(checkoutCartThunk())}>
                    Checkout
                </Button>
            </Offcanvas>
        </div>
    );
};

export default Sidebar;