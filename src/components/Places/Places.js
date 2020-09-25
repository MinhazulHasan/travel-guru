import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.min.css';
// import 'owl.carousel/dist/assets/owl.theme.default.min.css';

const Places = ({ place }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(`/place/${place.placeName}`);
    }
    return (
        <Card style={{ width: '18rem', margin: '100px 0' }}>
            <Card.Img variant="top" src={place.imgURL} style={{ height: '200px' }} />
            <Card.Body>
                <Card.Title>{place.placeName}</Card.Title>
                {/* <Card.Text>
                    {place.sortDescription}
                </Card.Text> */}
                <Button onClick={() => handleClick(place.placeName)} variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
};

export default Places;