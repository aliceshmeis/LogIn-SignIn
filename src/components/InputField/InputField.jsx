import React, { forwardRef } from 'react';
import styles from './InputField.module.scss';

const InputField = forwardRef(({ 
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props 
}, ref) => {
  const inputClass = `
    ${styles.input} 
    ${error ? styles.error : ''} 
    ${disabled ? styles.disabled : ''}
    ${className}
  `.trim();

  return (
    <div className={styles.inputField}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={inputClass}
        {...props}
      />
      
      {error && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;