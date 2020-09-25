import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { BookingContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(BookingContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.email ? (children) : 
                (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;