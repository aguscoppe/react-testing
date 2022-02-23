import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

// two params: description + cb function
test('inputs should be initially empty', () => {
  render(<App />); // which component we want to check
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

/* EMAIL */

test('should be able to type an email', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  userEvent.type(emailInputElement, 'name@mail.com');
  expect(emailInputElement.value).toBe('name@mail.com');
});

test('should show email error message on invalid email', () => {
  render(<App />);
  let emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  expect(emailErrorElement).not.toBeInTheDocument();
  userEvent.type(emailInputElement, 'nameemail.com');
  userEvent.click(submitBtnElement);
  emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  expect(emailErrorElement).toBeInTheDocument();
});

/* PASSWORD */
test('should be able to type a password', () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText('Password');
  userEvent.type(passwordInputElement, 'password123');
  expect(passwordInputElement.value).toBe('password123');
});

test('should show error message if password is less than 5 characters', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  let passwordErrorElement = screen.queryByText(
    /the password must be at least 5 characters long/i
  );
  expect(passwordErrorElement).not.toBeInTheDocument();
  userEvent.type(emailInputElement, 'name@email.com');
  userEvent.type(passwordInputElement, '11');
  userEvent.click(submitBtnElement);
  passwordErrorElement = screen.queryByText(
    /the password must be at least 5 characters long/i
  );
  expect(passwordErrorElement).toBeInTheDocument();
});

/* CONFIRM PASSWORD */
test('should be able to type a confirm password', () => {
  render(<App />);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, 'password123');
  expect(confirmPasswordInputElement.value).toBe('password123');
});

test('should show error message on non-matching passwords', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  let confirmPasswordErrorElement = screen.queryByText(
    /the passwords must match/i
  );
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
  userEvent.type(emailInputElement, 'name@email.com');
  userEvent.type(passwordInputElement, '12345');
  userEvent.type(confirmPasswordInputElement, '111');
  userEvent.click(submitBtnElement);
  confirmPasswordErrorElement = screen.queryByText(/the passwords must match/i);
  expect(confirmPasswordErrorElement).toBeInTheDocument();
});

/* SUBMIT */

test('should show no error message if inputs are valid', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  let emailErrorElement = screen.queryByText(/the email you input is invalid/i);
  const passwordInputElement = screen.getByLabelText('Password');
  const passwordErrorElement = screen.queryByText(
    /the password must be at least 5 characters long/i
  );
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords must match/i
  );
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  userEvent.type(emailInputElement, 'name@email.com');
  userEvent.type(passwordInputElement, '12345');
  userEvent.type(confirmPasswordInputElement, '12345');
  userEvent.click(submitBtnElement);
  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});
