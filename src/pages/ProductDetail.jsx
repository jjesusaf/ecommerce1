import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

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

    return (
        <div>
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
            {relatedProducts.map(productItem=>(
                <li key={productItem.id}>
                   <Link to={`/product/${productItem.id}`}>
                   {productItem.title}
                   </Link> 
                </li>
            ))}
        </div>
    );
};

export default ProductDetail;