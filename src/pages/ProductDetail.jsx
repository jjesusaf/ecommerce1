import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { createCartThunk } from '../store/slices/cart.slice';
import { Card, Col, Container, Row } from 'react-bootstrap';

const ProductDetail = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const { id } = useParams()
    const productsList = useSelector(state => state.products)

    const products = productsList.find(productItem => productItem.id === Number(id))

    const relatedProducts = productsList.filter(productItem => productItem.category.id === products.category.id)

    console.log(relatedProducts)

    const [quantity, setQuantity] = useState("")

    const addProducts = () => {

        const product = {
            id: products.id,
            quantity: quantity
        }

        dispatch(createCartThunk(product))
    }

    return (
        <div>
            <Row>
                <Col lg={6}>
                    <Carousel>
                        <Carousel.Item className='carousel'>
                            <img
                                className="d-block w-100"
                                src={products?.productImgs[0]}
                                alt="First slide"
                                id='carousel'
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={products?.productImgs[1]}
                                alt="Second slide"
                                id='carousel'
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={products?.productImgs[2]}
                                alt="Third slide"
                                id='carousel'
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col lg={6}>
                    <div className='infodetail'>
                        <h1>
                            {products?.title}
                        </h1>
                        <p>
                            {products?.description}
                        </p>
                        <p>
                            Price: <br />
                            $ {products?.price}
                        </p>
                        <input
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)} />
                        <button onClick={addProducts}>
                            Add product
                        </button>
                    </div>
                </Col>
            </Row>
            <Container className='my-5' >
                <h2>
                    Product Suggestions
                </h2>
                <Container className='my-4'>
                    <Row xs={2} md={4} lg={6} className="g-4">
                        {relatedProducts.map(productItem => (
                            <Col key={productItem.id}>
                                <Link to={`/product/${productItem.id}`}>
                                    <Card>
                                        <Card.Img variant="top" src={productItem?.productImgs?.[0]} className='over2' />
                                        <Card.Body>
                                            <Card.Title>{productItem.title}</Card.Title>
                                            <Card.Text>
                                                Price: ${productItem.price}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Container>
        </div>
    );
};

export default ProductDetail;