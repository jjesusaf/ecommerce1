import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk } from '../store/slices/products.slice';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { filterProductsThunk } from '../store/slices/products.slice';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { filterHeadThunk } from '../store/slices/products.slice';

const Home = () => {

    const [category, setCategory] = useState([])
    const [inputSearch, setInputSearch] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsThunk())
        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategory(res.data.data.categories))
    }, [])

    const dataProducts = useSelector(state => state.products)


    return (
        <div>
            <div className='btnsearch'>
                {category.map(categories => (
                    <Button key={categories.id} variant="primary" onClick={() => dispatch(filterProductsThunk(categories.id))}>{categories.name}</Button>
                ))}
            </div>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Product"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2
                    "
                    value={inputSearch}
                    onChange={e => setInputSearch(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2"
                    onClick={() => dispatch(filterHeadThunk(inputSearch))}>
                    Search
                </Button>
            </InputGroup>
            <div className='cardli'>
                {dataProducts.map(product => (
                    <li key={product.id} className='lihome' >
                        <div className='product-card'>
                            <Link to={`/product/${product.id}`}>
                                <div className='image'>
                                    <img src={product.productImgs?.[0]} alt="" className='over' />
                                </div>
                                <div className='info'>
                                    <span className='brand'>
                                    </span>
                                    <strong>
                                        {product.title}
                                    </strong>
                                    <span className='price'>
                                        Price
                                    </span>
                                    <span className='amount'>
                                        {product.price}
                                    </span>
                                </div>
                            </Link>
                            <button className='card-button'>
                                Buy
                            </button>
                        </div>
                    </li>
                ))}
            </div>

        </div>
    );
};

export default Home;