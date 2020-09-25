import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/fakeData';
import { Link, useHistory } from 'react-router-dom';
import './MainPage.css';
import { Button } from 'react-bootstrap';
import ReactInterval from 'react-interval';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainPage = () => {
    const [selectedPlace, setSelectedPlace] = useState(fakeData[0]);
    const [allPlaces, setAllPlaces] = useState(fakeData);

    useEffect(() => {
        const remainingPlaces = fakeData.filter(place => place !== selectedPlace);
        setAllPlaces([selectedPlace, ...remainingPlaces]);
    }, [selectedPlace]);

    const history = useHistory();
    const handleBook = (placeID) => {
        history.push(`/place/${placeID}`);
    }

    return (
        <div className="main-page">
            <ReactInterval
                callback={
                    () => selectedPlace.id === (allPlaces.length - 1) ? setSelectedPlace(fakeData[0]) : setSelectedPlace(fakeData[selectedPlace.id + 1])
                }
                timeout={6000}
                enabled={true}
            />
            <div className="d-flex align-items-center justify-content-center dark-overlay">
                <div className="container">
                    <div className="row">
                        <div className="my-auto col-md-5">
                            <h1>{selectedPlace.placeName}</h1>
                            <p className="my-5">
                                {selectedPlace.sortDescription}
                            </p>
                            <Button variant="warning" onClick={() => handleBook(selectedPlace.placeName)}>
                                <strong>BOOKING <FontAwesomeIcon icon={faArrowRight} /></strong>
                            </Button>
                        </div>

                        <div className="col-md-7 my-auto">
                            <div className="p-3 overflow-hidden d-flex">
                                {
                                    allPlaces.map((place) => (
                                        <Link
                                            to={`place/${place.placeName}`}
                                            onClick={() => setSelectedPlace(place)}
                                            className={`place-description ${place === selectedPlace && "selected-place"}`}
                                            key={place.id}
                                        >
                                            <img src={place.imgURL} alt="not found" className="place-image" />
                                            <h5 className="place-name ml-3">{place.placeName}</h5>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="arrow-button-field mt-4 row justify-content-center">
                        <div className="d-flex">
                            <button
                                onClick={() => setSelectedPlace(selectedPlace.id === 0 ? fakeData[allPlaces.length - 1] : fakeData[selectedPlace.id - 1])}
                            >
                                <FontAwesomeIcon className="arrow-icon" size="3x" icon={faArrowAltCircleLeft}></FontAwesomeIcon>
                            </button>
                            
                            <button
                                onClick={() => setSelectedPlace(selectedPlace.id === (allPlaces.length - 1) ? fakeData[0] : fakeData[selectedPlace.id + 1])}
                            >
                                <FontAwesomeIcon className="arrow-icon" size="3x" icon={faArrowAltCircleRight}></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;