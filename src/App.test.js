import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

const setup = () => {
  render(<App />); // which component we want to check
};

/* HELPER FUNCTIONS */

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const submitForm = () => {
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitBtnElement);
};

/* TESTS */

describe('App', () => {
  test('inputs should be initially empty', () => {
    setup();
    const emailInputElement = screen.getByRole('textbox');
    const passwordInputElement = screen.getByLabelText('Password');
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i);
    expect(emailInputElement.value).toBe('');
    expect(passwordInputElement.value).toBe('');
    expect(confirmPasswordInputElement.value).toBe('');
  });

  describe('Email Input', () => {
    test('should be able to type an email', () => {
      setup();
      const { emailInputElement } = typeIntoForm({
        email: 'name@mail.com',
      });
      expect(emailInputElement.value).toBe('name@mail.com');
    });

    test('should show email error message on invalid email', () => {
      setup();
      let emailErrorElement = screen.queryByText(
        /the email you input is invalid/i
      );
      expect(emailErrorElement).not.toBeInTheDocument();
      typeIntoForm('nameemail.com');
      submitForm();
      emailErrorElement = screen.queryByText(/the email you input is invalid/i);
      expect(emailErrorElement).toBeInTheDocument();
    });
  });

  describe('Password Input', () => {
    test('should be able to type a password', () => {
      setup();
      const { passwordInputElement } = typeIntoForm({
        password: 'password123',
      });
      expect(passwordInputElement.value).toBe('password123');
    });

    test('should show error message if password is less than 5 characters', () => {
      setup();
      let passwordErrorElement = screen.queryByText(
        /the password must be at least 5 characters long/i
      );
      expect(passwordErrorElement).not.toBeInTheDocument();
      typeIntoForm({ email: 'name@email.com', password: '11' });
      submitForm();
      passwordErrorElement = screen.queryByText(
        /the password must be at least 5 characters long/i
      );
      expect(passwordErrorElement).toBeInTheDocument();
    });
  });

  describe('Confirm Password Input', () => {
    test('should be able to type a confirm password', () => {
      setup();
      setup();
      const { confirmPasswordInputElement } = typeIntoForm({
        confirmPassword: 'password123',
      });
      expect(confirmPasswordInputElement.value).toBe('password123');
    });

    test('should show error message on non-matching passwords', () => {
      setup();
      let confirmPasswordErrorElement = screen.queryByText(
        /the passwords must match/i
      );
      expect(confirmPasswordErrorElement).not.toBeInTheDocument();
      typeIntoForm({
        email: 'name@email.com',
        password: '12345',
        confirmPassword: '11',
      });
      submitForm();
      confirmPasswordErrorElement = screen.queryByText(
        /the passwords must match/i
      );
      expect(confirmPasswordErrorElement).toBeInTheDocument();
    });
  });

  test('should show no error message if inputs are valid', () => {
    setup();
    let emailErrorElement = screen.queryByText(
      /the email you input is invalid/i
    );
    const passwordErrorElement = screen.queryByText(
      /the password must be at least 5 characters long/i
    );
    const confirmPasswordErrorElement = screen.queryByText(
      /the passwords must match/i
    );
    typeIntoForm({
      email: 'name@email.com',
      password: '12345',
      confirmPassword: '12345',
    });
    submitForm();
    expect(emailErrorElement).not.toBeInTheDocument();
    expect(passwordErrorElement).not.toBeInTheDocument();
    expect(confirmPasswordErrorElement).not.toBeInTheDocument();
  });
});
