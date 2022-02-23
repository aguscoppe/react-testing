import { useState } from 'react';
import './App.css';
import validator from 'validator';

function App() {
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    let errorMsg = '';
    if (!validator.isEmail(signupInput.email)) {
      errorMsg = 'The email you input is invalid';
    } else if (signupInput.password.length < 5) {
      errorMsg = 'The password must be at least 5 characters long';
    } else if (signupInput.password !== signupInput.confirmPassword) {
      errorMsg = 'The passwords must match';
    }
    return setError(errorMsg);
  };

  return (
    <div className='App'>
      <form>
        <div>
          <label htmlFor='email'>Email address </label>
          <input
            type='email'
            id='email'
            name='email'
            value={signupInput.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={signupInput.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <button type='submit' onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
