import React from "react";
import { render, screen } from '@testing-library/react';
import App from './App';

/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

// two params: description + cb function
test("inputs should be initially empty", () => {
  render(<App />); // which component we want to check
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText(/password/i);
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});