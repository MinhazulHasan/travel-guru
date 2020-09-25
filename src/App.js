import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar/NavBar';
import SelectedPlace from './components/SelectedPlace/SelectedPlace';
import Book from './components/Book/Book';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';

export const BookingContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <BookingContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/booking/:placeName">
            <Book />
          </PrivateRoute>
          <Route path="/place/:placeName">
            <SelectedPlace />
          </Route>
          <Route path="/main">
            <MainPage />
          </Route>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </BookingContext.Provider>
  );
}

export default App;
