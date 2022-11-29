import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseThunk } from '../store/slices/purchase.slice';

const Purchase = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPurchaseThunk())
    },[])

    const purchase = useSelector(state => state.purchase)

    console.log(purchase)

    return (
        <div>
            <h1>Purchases</h1>

        </div>
    );
};

export default Purchase;