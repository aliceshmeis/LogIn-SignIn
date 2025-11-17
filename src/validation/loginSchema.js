// This file defines the rules for login form validation
import * as Yup from 'yup';

// Validation rules for login form
export const loginSchema = Yup.object({ //the form data should be object with specific feilds
  // Username rules
  username: Yup.string()
    .required('Username is required')           // Must not be empty
    .min(3, 'Username must be at least 3 characters'),  // Minimum length
  
  // Password rules
  password: Yup.string()
    .required('Password is required')           // Must not be empty
    .min(6, 'Password must be at least 6 characters'),  // Minimum length
});