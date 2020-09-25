import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';
import hotels from '../../fakeData/hotels'
import GoogleMap from '../GoogleMap/GoogleMap';
import HotelDetails from '../HotelDetails/HotelDetails';
import './Book.css';

const Book = () => {
    const { placeName } = useParams();
    const selectedPlace = fakeData.filter(place => place.placeName === placeName);
    return (
        <div className="container" style={{marginTop:'100px'}}>
            <div className="row flex-column">
                <p className="mb-0">252 stays sep 10-13 3 guests</p>
                <h1 className="mt-0">Stay in {selectedPlace[0].placeName}</h1>
            </div>

            <div className="row">
                <div className="col-md-6">
                    {
                        hotels.map(hotel => <HotelDetails hotel={hotel} key={hotel.id}></HotelDetails>)
                    }
                </div>

                <div className="col-md-6" style={{ height: "500px" }}>
                    <GoogleMap place={selectedPlace[0]}></GoogleMap>
                </div>
            </div>
        </div>
    );
};

export default Book;