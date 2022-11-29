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

    console.log(category)

    const dataProducts = useSelector(state => state.products)


    return (
        <div>
            {category.map(categories => (
                <Button key={categories.id} variant="primary" onClick={() => dispatch(filterProductsThunk(categories.id))}>{categories.name}</Button>
            ))}
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Recipient's username"
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
            {dataProducts.map(product => (
                <li key={product.id}>
                    <Link to={`/product/${product.id}`}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={product.productImgs?.[0]} />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>
                                    <p>Price</p>
                                    <p>{product.price}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Link>
                </li>
            ))}
        </div>
    );
};

export default Home;