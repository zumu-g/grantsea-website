import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, fullWidth = false, icon, className = '', ...props }, ref) => {
    const inputStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      padding: icon ? '12px 12px 12px 40px' : '12px',
      fontSize: '16px',
      lineHeight: '1.5',
      color: '#333',
      backgroundColor: '#fff',
      border: error ? '1px solid #e53e3e' : '1px solid #e5e5e5',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      outline: 'none',
    };

    const containerStyles: React.CSSProperties = {
      display: 'inline-block',
      width: fullWidth ? '100%' : 'auto',
      position: 'relative',
    };

    const labelStyles: React.CSSProperties = {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#333',
    };

    const errorStyles: React.CSSProperties = {
      display: 'block',
      marginTop: '4px',
      fontSize: '14px',
      color: '#e53e3e',
    };

    const helpTextStyles: React.CSSProperties = {
      display: 'block',
      marginTop: '4px',
      fontSize: '14px',
      color: '#666',
    };

    const iconStyles: React.CSSProperties = {
      position: 'absolute',
      left: '12px',
      top: label ? '36px' : '12px',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
      color: '#666',
    };

    return (
      <div style={containerStyles}>
        {label && <label style={labelStyles}>{label}</label>}
        <div style={{ position: 'relative' }}>
          {icon && <div style={iconStyles}>{icon}</div>}
          <input
            ref={ref}
            style={inputStyles}
            className={className}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#000';
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0, 0, 0, 0.1)';
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error ? '#e53e3e' : '#e5e5e5';
              e.currentTarget.style.boxShadow = 'none';
              props.onBlur?.(e);
            }}
            {...props}
          />
        </div>
        {error && <span style={errorStyles}>{error}</span>}
        {helpText && !error && <span style={helpTextStyles}>{helpText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

// Select component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helpText, fullWidth = false, options, className = '', ...props }, ref) => {
    const selectStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      padding: '12px',
      fontSize: '16px',
      lineHeight: '1.5',
      color: '#333',
      backgroundColor: '#fff',
      border: error ? '1px solid #e53e3e' : '1px solid #e5e5e5',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      outline: 'none',
      cursor: 'pointer',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center',
      paddingRight: '36px',
    };

    const containerStyles: React.CSSProperties = {
      display: 'inline-block',
      width: fullWidth ? '100%' : 'auto',
    };

    const labelStyles: React.CSSProperties = {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#333',
    };

    const errorStyles: React.CSSProperties = {
      display: 'block',
      marginTop: '4px',
      fontSize: '14px',
      color: '#e53e3e',
    };

    const helpTextStyles: React.CSSProperties = {
      display: 'block',
      marginTop: '4px',
      fontSize: '14px',
      color: '#666',
    };

    return (
      <div style={containerStyles}>
        {label && <label style={labelStyles}>{label}</label>}
        <select
          ref={ref}
          style={selectStyles}
          className={className}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#000';
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0, 0, 0, 0.1)';
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? '#e53e3e' : '#e5e5e5';
            e.currentTarget.style.boxShadow = 'none';
            props.onBlur?.(e);
          }}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span style={errorStyles}>{error}</span>}
        {helpText && !error && <span style={helpTextStyles}>{helpText}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Textarea component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helpText, fullWidth = false, className = '', ...props }, ref) => {
    const textareaStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      padding: '12px',
      fontSize: '16px',
      lineHeight: '1.5',
      color: '#333',
      backgroundColor: '#fff',
      border: error ? '1px solid #e53e3e' : '1px solid #e5e5e5',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px',
    };

    const containerStyles: React.CSSProperties = {
      display: 'inline-block',
      width: fullWidth ? '100%' : 'auto',
    };

    const labelStyles: React.CSSProperties = {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#333',
    };

    const errorStyles: React.CSSProperties = {
      display: 'block',
      marginTop: '4px',
      fontSize: '14px',
      color: '#e53e3e',
    };

    const helpTextStyles: React.CSSProperties = {
      display: 'block',
      marginTop: '4px',
      fontSize: '14px',
      color: '#666',
    };

    return (
      <div style={containerStyles}>
        {label && <label style={labelStyles}>{label}</label>}
        <textarea
          ref={ref}
          style={textareaStyles}
          className={className}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#000';
            e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0, 0, 0, 0.1)';
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? '#e53e3e' : '#e5e5e5';
            e.currentTarget.style.boxShadow = 'none';
            props.onBlur?.(e);
          }}
          {...props}
        />
        {error && <span style={errorStyles}>{error}</span>}
        {helpText && !error && <span style={helpTextStyles}>{helpText}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';