

import React, { useState, useEffect } from 'react';
import './RegisterPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setEmployees(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch employees');
      setLoading(false);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'phone') setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone }),
      });

      if (response.ok) {
        alert('User registered successfully!');
        setName('');
        setEmail('');
        setPhone('');
      } else {
        alert('Failed to register user');
      }
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div className="register-page">

      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>

  
      <div className="employee-list">
        <h2>Employee List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="grid">
            {employees.map((employee) => (
              <div key={employee.id} className="employee-card">
                <h3>{employee.name}</h3>
                <p>{employee.email}</p>
                <p>{employee.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
