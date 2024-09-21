import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Test() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user'
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Hanlde Login')
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div>
          <label>
            <input
              type="radio"
              value="user"
              checked={role === 'user'}
              onChange={(e) => setRole(e.target.value)} />
            Login as User
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={(e) => setRole(e.target.value)} />
            Login as Admin
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
