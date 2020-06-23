import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../hooks/use-request';

export default ({ signType, label }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: `/api/users/${signType}`,
    method: 'post',
    body: { email, password },
    onSuccess: () => {
      Router.push('/');
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit} noValidate>
        <h1>{label}</h1>
        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='form-control'
          />
        </div>
        {errors}
        <button className='btn btn-primary'>{label}</button>
      </form>
    </div>
  );
};
