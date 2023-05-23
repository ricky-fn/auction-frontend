import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoginView, setIsLoginView] = useState(true);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return 'Email is required.';
    }

    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }

    return null;
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password) {
      return 'Password is required.';
    }

    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters long and contain at least one letter and one number.';
    }

    return null;
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'email') {
      const emailError = validateEmail(value);
      setEmailError(emailError);
    }

    if (name === 'password') {
      const passwordError = validatePassword(value);
      setPasswordError(passwordError);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setEmailError(emailError);
    setPasswordError(passwordError);

    if (!emailError && !passwordError) {
      // Make API request or perform desired action
      // e.g., authenticate the user or register the user
      // ...
      console.log(email, password)
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setEmailError('');
    setPasswordError('');
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>{isLoginView ? 'Login' : 'Registration'}</h2>
        {emailError && <Alert variant="danger">{emailError}</Alert>}
        {passwordError && <Alert variant="danger">{passwordError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name='email' placeholder="Enter email" value={email} onChange={handleEmailChange} onBlur={handleBlur} />
          </Form.Group>
          <Form.Group controlId="password" className='mt-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name='password' placeholder="Password" value={password} onChange={handlePasswordChange} onBlur={handleBlur} />
          </Form.Group>
          <Button type="submit" variant="primary" className='mt-4'>
            {isLoginView ? 'Login' : 'Register'}
          </Button>
          <p>
            {isLoginView ? "Don't have an account? " : 'Already have an account? '}
            <Button variant="link" onClick={toggleView}>
              {isLoginView ? 'Register here' : 'Login here'}
            </Button>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;