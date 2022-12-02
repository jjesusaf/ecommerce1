import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseThunk } from '../store/slices/purchase.slice';

const Purchase = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPurchaseThunk())
    }, [])

    const purchase = useSelector(state => state.purchase)

    console.log(purchase)

    const getFormatedDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }
    return (
        <div>
            <h1>
                My purchases
            </h1>
            {purchase.map(unic => (
                <Card key={unic.id} className='cardPurchase'>
                    <Card.Header>{getFormatedDate(unic.createdAt)}</Card.Header>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <div className='purchases'>
                            <span >
                                {unic?.cart?.products?.[0]?.title}
                            </span>
                            <span>
                                {unic?.cart?.products?.[0]?.productsInCart?.quantity}
                            </span>
                            <span>
                                $ {unic?.cart?.products?.[0]?.productsInCart?.quantity * parseInt(unic?.cart?.products?.[0]?.price)}
                            </span>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Purchase;