import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { BookingContext } from '../../App';
import './Login.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import googleIcon from '../../images/Icon/google.png';
import fbIcon from '../../images/Icon/fb.png';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

const Login = () => {

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: ''
    });

    const [loggedInUser, setLoggedInUser] = useContext(BookingContext);

    const [newUser, setNewUser] = useState(false);

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const googleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(error => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                setUser(newUserInfo);
            });
    }

    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const fbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(error => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                setUser(newUserInfo);
            });
    }


    const handleSubmit = (e) => {
        if (newUser && user.name && user.email && user.password === user.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    updateUserName(user.name);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.name = res.user.displayName;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log("Sign in user info : \n", res.user);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'name') {
            isFieldValid = e.target.value.length > 3 && e.target.value.length < 20;
            document.getElementById('name').innerText = isFieldValid ? '' : 'Name must have atleast 3 characters';
        }
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            document.getElementById('email').innerText = isFieldValid ? '' : 'Enter a valid email address';
        }
        if (e.target.name === 'password') {
            const checkPasswordLength = e.target.value.length > 5 && e.target.value.length < 11;
            const isPasswordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordHasNumber && checkPasswordLength;
            document.getElementById('password').innerText = isFieldValid ? '' : 'Password must be contain 6-10 charactes with a number';
        }
        if (e.target.name === 'confirmPassword') {
            if (e.target.value !== user.password) {
                isFieldValid = false;
                document.getElementById('confirmPassword').innerText = "Password doesn't match";
            }
            else {
                document.getElementById('confirmPassword').innerText = "";
            }
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    return (
        <div className="form-body d-flex align-items-center justify-content-center">
            <div className="signup-form">
                <Form onSubmit={handleSubmit}>
                    {newUser ? <h4 className="text-center">Create an account</h4> : <h4 className="text-center">Login</h4>}
                    <hr />
                    {newUser &&
                        <Form.Group>
                            <Form.Control onBlur={handleBlur} name="name" type="text" placeholder="Enter your name" required />
                            <Form.Text className="text-danger" id="name"></Form.Text>
                        </Form.Group>
                    }

                    <Form.Group>
                        <Form.Control onBlur={handleBlur} name="email" type="text" placeholder="Enter email" required />
                        <Form.Text className="text-danger" id="email"></Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control onBlur={handleBlur} name="password" type="password" placeholder="Enter Password" required />
                        <Form.Text className="text-danger" id="password"></Form.Text>
                    </Form.Group>

                    {newUser &&
                        <Form.Group>
                            <Form.Control onBlur={handleBlur} name="confirmPassword" type="password" placeholder="Confirm Password" />
                            <Form.Text className="text-danger" id="confirmPassword"></Form.Text>
                        </Form.Group>
                    }

                    <Button variant="secondary" type="submit" size="md" block>{newUser ? 'Sign Up' : 'Sign In'}</Button>

                    {newUser ?
                        <p className="text-center text-muted mt-2">Already have an account? <span className="toggle-text" onClick={() => setNewUser(!newUser)}>Login</span></p>
                        :
                        <p className="text-center text-muted mt-2">Don't have an account? <span className="toggle-text" onClick={() => setNewUser(!newUser)}>Create an account</span></p>
                    }

                </Form>

                <p className="mt-2 text-danger">{user.error}</p>

                <div className="d-flex align-items-center justify-content-center orSection">
                    <div></div>
                    <p className="text-dark my-0 mx-2">OR</p>
                    <div></div>
                </div>

                <Button onClick={googleSignIn} className="social-media-btn" variant="light" size="md" block>
                    <img src={googleIcon} alt="" />
                    <span className="mx-auto">Continue with Google</span>
                </Button>
                <Button onClick={fbSignIn} className="social-media-btn" variant="light" size="md" block>
                    <img src={fbIcon} alt="" />
                    <span className="mx-auto">Continue with Facebook</span>
                </Button>

            </div>
        </div>
    );
};

export default Login;