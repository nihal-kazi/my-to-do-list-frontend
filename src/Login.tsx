import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async ({ username, password }) => {
    try {
      const response = await axios.post('https://my-to-do-list-jhwx.onrender.com/api/login', { username, password });
      const { data } = response;

      // Save the token to localStorage or a global context
      localStorage.setItem('token', data?.token);
      localStorage.setItem('user', JSON.stringify(data?.user));

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  });

  return (
    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={onSubmit}>
    //     <input type="text" {...register('username')} placeholder="Username" />
    //     <input type="password" {...register('password')} placeholder="Password" />
    //     <button type="submit">Login</button>
    //   </form>
    //   {error && <p>{error}</p>}
    // </div>
    <Container>
    <LoginForm onSubmit={onSubmit}>
      <Title>Login</Title>
      <Input type="text" placeholder="Username" {...register('username')}  />
      <Input type="password" placeholder="Password" {...register('password')} />
      <Button type="submit">Login</Button>
      {error && <p style={{color: "red"}}>{error}</p>}
    </LoginForm>
  </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  width: 300px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  width: calc(100%);
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export default Login;
