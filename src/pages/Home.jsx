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
import { ButtonGroup, Col, ListGroupItem, Row } from 'react-bootstrap';

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
            <Row>
                <Col lg={3}>
                    <ListGroup>
                        {category.map(categories => (
                            <ListGroupItem
                                key={categories.id}
                                onClick={() => dispatch(filterProductsThunk(categories.id))}
                                style={{ cursor: 'pointer' }}>{categories.name}</ListGroupItem>
                        ))}
                    </ListGroup>
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
                </Col>
                <Col lg={9}>
                    <Row xs={1} md={3} className="g-4">
                        {dataProducts.map(product => (
                            <Col key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <Card>
                                        <Card.Img variant="top" src={product.productImgs?.[0]} className='over' />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;