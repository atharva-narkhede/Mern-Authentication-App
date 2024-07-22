import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, { email, password });
      login(data);
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleOAuthLogin = (provider) => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/${provider}`, "_self");
  };

  return (
    <form onSubmit={submitHandler} className="container mt-5">
      <h2 className="text-center text-primary">Login</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <button type="submit" className="btn btn-primary d-block mx-auto">Login</button>
      <br />
      <button type="button" onClick={() => handleOAuthLogin('google')} className="btn btn-danger d-block mx-auto">Login with Google</button>
      <button type="button" onClick={() => handleOAuthLogin('github')} className="btn btn-dark d-block mx-auto">Login with GitHub</button>
    </form>
  );
};

export default LoginPage;
