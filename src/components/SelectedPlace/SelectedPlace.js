import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';
import './SelectedPlace.css';

const SelectedPlace = () => {
    const { placeName } = useParams();
    const selectedPlace = fakeData.filter(place => place.placeName === placeName);
    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        history.push(`/booking/${placeName}`);
    }
    return (
        <div className="select-place">
            <div className="d-flex align-items-center justify-content-center dark-overlay">
                <div className="container row">
                    <div className="col-md-5 m-auto">
                        <div className="my-auto">
                            <h1 className="mb-4">{selectedPlace[0].placeName}</h1>
                            <p>{selectedPlace[0].fullDescription}</p>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-6">
                        <Form className='submitted-form' onSubmit={handleSubmit}>
                            <Form.Group controlId="formGridAddress">
                                <Form.Label>Origin</Form.Label>
                                <Form.Control className="input-field" type="text" placeholder="Enter your location..." required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Destination</Form.Label>
                                <Form.Control className="input-field" type="text" value={selectedPlace[0].placeName} required />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>From</Form.Label>
                                    <Form.Control className="input-field" type="date" required />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>To</Form.Label>
                                    <Form.Control className="input-field" type="date" required />
                                </Form.Group>
                            </Form.Row>
                            <Button type="submit" className="mt-2 py-1" variant="warning" size="lg" block>Start Booking</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedPlace;