import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import '@testing-library/jest-dom';


describe('LoginForm', () => {


  it('submits the form with valid data and displays success message', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/heslo/i);
    const submitButton = screen.getByRole('button', { name: /prihlásiť sa/i });

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Check for loading spinner after submit
    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/prihlásenie bolo úspešné/i)).toBeInTheDocument();
    });
  });
  
});


/* test('should return success when valid credentials are provided', () => {
  const mockOnSuccess = jest.fn();
  const mockOnFailure = jest.fn();

  render(<LoginForm />);

  // Fill in the fields with valid data
  fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });

  // Submit the form
  fireEvent.click(screen.getByText('Login'));

  // Check that the success function was called
  expect(mockOnSuccess).toHaveBeenCalled();
  expect(mockOnFailure).not.toHaveBeenCalled();
}); */