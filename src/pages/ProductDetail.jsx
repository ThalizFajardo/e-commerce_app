///MUESTRA UN SOLO PRODUCTO EN DETALLE
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductThunk } from '../store/slices/product.slice';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ProductDetail = () => {
    const allProduct = useSelector(state => state.product)
    const [productDetail, setProductDetail] = useState({})
    const [suggestedProducts, setSuggestedProducts] = useState([])

    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductThunk())
    }, []);

    useEffect(() => {
        const productfind = allProduct.find(productItem => productItem.id === Number(id))
        setProductDetail(productfind)

        const filteredProducts = allProduct.filter(productItem =>
            productItem.category.id === productfind.category.id)
        setSuggestedProducts(filteredProducts)

    }, [allProduct, id])


    return (
        <div>

            <h1>{productDetail?.title}</h1>

            <img src={productDetail?.productImgs?.[2]} alt="" />

            <p>{productDetail?.description}</p>

            <ul>
                {
                    suggestedProducts.map(products => (
                        <li onClick={() => navigate(`/product/${products.id}`)} key={products.id}>
                            <h3> {products?.title}</h3>
                            <img src={products.productImgs?.[2]} />
                        </li>
                    ))}
            </ul>

        </div>
    );
};

export default ProductDetail;