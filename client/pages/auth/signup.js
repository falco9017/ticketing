import { useState } from 'react';
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwError, setPwError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      err.response.data.errors.forEach((error) => {
        if (error.field === 'email') {
          setEmailError(error.message);
        }
        if (error.field === 'password') {
          setPwError(error.message);
        }
      });
    }
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <h1>Sign up</h1>
        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${emailError !== '' ? 'is-invalid' : ''}`}
          />
          <div className='invalid-feedback'>{emailError}</div>
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-control ${pwError !== '' ? 'is-invalid' : ''}`}
          />
          <div className='invalid-feedback'>{pwError}</div>
        </div>
        <button className='btn btn-primary'>Sign Up</button>
      </form>
    </div>
  );
};
