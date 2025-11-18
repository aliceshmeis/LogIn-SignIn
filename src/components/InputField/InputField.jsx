import React, { useState, forwardRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './InputField.module.scss';

const InputField = forwardRef(({ 
  label, 
  type = 'text', 
  name, 
  placeholder, 
  error, 
  required = false,
  ...rest
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={styles.inputField}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          {...rest}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeButton}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;