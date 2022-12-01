import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseThunk } from '../store/slices/purchase.slice';

const Purchase = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPurchaseThunk())
    },[])

    const purchase = useSelector(state => state.purchase)

    return (
        <div>
            <h1>My purchases</h1>
            <div className='purchases'>
            {purchase.map(purchases=>(
                <li key={purchases.id}>
                    {purchases.cart?.products?.[0]?.title}
                </li>
            ))}
            </div>
        </div>
    );
};

export default Purchase;