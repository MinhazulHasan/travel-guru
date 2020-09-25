import React from 'react';

const HotelDetails = ({ hotel }) => {
    console.log(hotel);
    return (
        <div className="row my-5 d-flex justify-content-center align-items-center">
            <div className="col-6">
                <img src={hotel.imgURL} alt="not found" className="img-fluid" />
            </div>
            <div className="col-6">
                <div className="mx-auto">
                    <h6>{hotel.name}</h6>
                    <div className="text-muted" style={{lineHeight:'1.4rem'}}>
                        <span> 4 guests 2 bedrooms 2 beds 2 baths</span> <br/>
                        <span>With Air conditioning Kitchen</span> <br/>
                        <span>Cancellation fexibility available</span>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <p>⭐<strong> {hotel?.rating}</strong></p>
                        <p><strong> ${hotel.price}/  </strong><span className="text-muted">night $167 total</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;