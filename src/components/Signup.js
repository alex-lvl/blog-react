import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Navigate } from 'react-router-dom';
import  API_URL from '../config';

function Signup() {
  const [apiResponse, setApiResponse] = useState({
    message: '',
    isLoading: true,
    isValid: false,
    isLoggedIn: false,
  });

  useEffect(() => {
    fetch(`${API_URL}/signup`, {
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) =>
        setApiResponse({
          message: res.message,
          isLoading: false,
          isValid: res.isValid,
          isLoggedIn: res.isLoggedIn,
        })
      )
      .catch((err) => err);
  }, [setApiResponse]);

  function handleSignup(event) {
    event.preventDefault();
    setApiResponse({
      message: '',
      isLoading: true,
      isValid: false,
      isLoggedIn: false,
    })
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const jsonData = JSON.stringify(data);
  
    fetch(`${API_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData
    })
      .then(response => response.json())
      .then(res => 
        setApiResponse({
          message: res.message,
          isLoading: false,
          isValid: res.isValid,
          isLoggedIn: false,
        }))
      .catch(error => {
        console.error(error);
      });
  }

  if (apiResponse.isLoading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Loading...</p>
        </header>
      </div>
    );
  } else if (apiResponse.isLoggedIn) {
    return <Navigate to="/blogs" replace="true" />;
  } else if (apiResponse.isValid) {
    return <Navigate to="/login" replace="true" />;
  } else {
    return (
      <div className="register-page">
        <h1 className="register-heading">Sign Up</h1>
        <p className='error message'>{apiResponse.message}</p>
        <form action={`${API_URL}/signup`} method="POST" className="register-container" onSubmit={handleSignup}>
          <label htmlFor="firstname">First Name</label>
          <input
            className="register-input"
            name="firstname"
            placeholder="first name"
            type="text"
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            className="register-input"
            name="lastname"
            placeholder="last name"
            type="text"
          />
          <label htmlFor="email">email</label>
          <input
            className="register-input"
            name="email"
            placeholder="email"
            type="email"
          />
          <label htmlFor="username">username</label>
          <input
            className="register-input"
            name="username"
            placeholder="username"
            type="text"
          />
          <label htmlFor="password">Password</label>
          <input
            className="register-input"
            name="password"
            placeholder="password"
            type="password"
          />
          <button className="register-button">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
