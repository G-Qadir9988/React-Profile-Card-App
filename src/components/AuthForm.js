import React, { useState } from 'react';

const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = () => {
    if (!username || !password) {
      setMessage('Please enter both fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u) => u.username === username);

    if (isLogin) {
      if (existingUser && existingUser.password === password) {
        onLogin(username);
      } else {
        setMessage('Invalid credentials.');
      }
    } else {
      if (existingUser) {
        setMessage('Account already exists.');
      } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        setMessage('Account created! You can now log in.');
        setIsLogin(true);
        setUsername('');
        setPassword('');
      }
    }
  };

  return (
    <div className="auth-form">
      <h3 className="text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h3>

      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      {message && <div className="alert alert-info py-2">{message}</div>}

      <button className="btn btn-primary w-100 mb-2" onClick={handleAuth}>
        {isLogin ? 'Login' : 'Sign Up'}
      </button>

      <button
        className="btn btn-outline-secondary w-100"
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage('');
        }}
      >
        {isLogin ? 'Create an Account' : 'Back to Login'}
      </button>
    </div>
  );
};

export default AuthForm;
