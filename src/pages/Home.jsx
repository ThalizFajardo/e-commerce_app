///MUESTRA TODOS LOS PRODUCTOS EN GENERAL
import axios from 'axios';
import React from 'react';
import { filterCategoryThunk, filterProductThunk, getProductThunk } from '../store/slices/product.slice';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Card, Col, InputGroup, Row, Form, Button, ListGroup } from 'react-bootstrap';



const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("")
    const [categories, setCategories] = useState([])

    const product = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getProductThunk())
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    console.log(categories)

    return (
        <div>
            <Row>
                <Col lg={3}>

                    <ListGroup>
                        {categories.map(category => (
                            <ListGroup.Item key={category.id} onClick={() => dispatch(filterCategoryThunk(category.id))}>
                                {category.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue}
                        />
                        <Button variant="outline-secondary" onClick={() => dispatch(filterProductThunk(searchValue))}>
                            Button
                        </Button>
                    </InputGroup>



                    <Row xs={1} md={3} lg={3} className="g-4">
                        {
                            product.map(product => (
                                <Col key={product.id}>
                                    <Card onClick={() => navigate(`/product/${product.id}`)}>
                                        <Card.Img variant="top" src={product?.productImgs?.[0]} />
                                        <Card.Body>
                                            <Card.Title>{product?.title}</Card.Title>
                                            <Card.Text>{product.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                </Col>
            </Row>
        </div >
    );
};

export default Home;