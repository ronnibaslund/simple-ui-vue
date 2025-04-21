/**
 * Validation Rules Utility
 * 
 * This file contains reusable validation rule functions that can be used with
 * form components like SimpleInput, SimpleForm, etc.
 */

/**
 * Validation Rule Type
 * A function that takes a value and returns either:
 * - true: if validation passes
 * - false: if validation fails with default message
 * - string: if validation fails with custom message
 */
export type ValidationRule = (value: any) => boolean | string | null;

/**
 * Create a required validator
 * @param message Custom error message (optional)
 */
export const required = (message = 'This field is required'): ValidationRule => {
  return (value: any) => {
    if (value === null || value === undefined || value === '') {
      return message;
    }
    return true;
  };
};

/**
 * Create a minimum length validator
 * @param min Minimum length required
 * @param message Custom error message (optional)
 */
export const minLength = (min: number, message?: string): ValidationRule => {
  return (value: any) => {
    if (!value || value.length < min) {
      return message || `Must be at least ${min} characters`;
    }
    return true;
  };
};

/**
 * Create a maximum length validator
 * @param max Maximum length allowed
 * @param message Custom error message (optional)
 */
export const maxLength = (max: number, message?: string): ValidationRule => {
  return (value: any) => {
    if (value && value.length > max) {
      return message || `Cannot exceed ${max} characters`;
    }
    return true;
  };
};

/**
 * Email validator
 * @param message Custom error message (optional)
 */
export const email = (message = 'Please enter a valid email address'): ValidationRule => {
  return (value: any) => {
    if (!value) return true; // Skip if empty (use required() for requiring it)
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? true : message;
  };
};

/**
 * URL validator
 * @param message Custom error message (optional)
 */
export const url = (message = 'Please enter a valid URL'): ValidationRule => {
  return (value: any) => {
    if (!value) return true; // Skip if empty (use required() for requiring it)
    
    try {
      new URL(value);
      return true;
    } catch (e) {
      return message;
    }
  };
};

/**
 * Numeric value validator
 * @param message Custom error message (optional)
 */
export const numeric = (message = 'Please enter a number'): ValidationRule => {
  return (value: any) => {
    if (!value) return true; // Skip if empty
    
    return !isNaN(Number(value)) ? true : message;
  };
};

/**
 * Minimum value validator (for numbers)
 * @param min Minimum value allowed
 * @param message Custom error message (optional)
 */
export const min = (min: number, message?: string): ValidationRule => {
  return (value: any) => {
    if (!value) return true; // Skip if empty
    
    const num = Number(value);
    return !isNaN(num) && num >= min ? true : (message || `Must be at least ${min}`);
  };
};

/**
 * Maximum value validator (for numbers)
 * @param max Maximum value allowed
 * @param message Custom error message (optional)
 */
export const max = (max: number, message?: string): ValidationRule => {
  return (value: any) => {
    if (!value) return true; // Skip if empty
    
    const num = Number(value);
    return !isNaN(num) && num <= max ? true : (message || `Must not exceed ${max}`);
  };
};

/**
 * Pattern validator (for regex patterns)
 * @param pattern RegExp to test against
 * @param message Custom error message (optional)
 */
export const pattern = (pattern: RegExp, message = 'Invalid format'): ValidationRule => {
  return (value: any) => {
    if (!value) return true; // Skip if empty
    
    return pattern.test(value) ? true : message;
  };
};

/**
 * Password strength validator
 * @param options Configuration options
 * @param message Custom error message (optional)
 */
export const password = (
  options = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: true
  },
  message?: string
): ValidationRule => {
  return (value: any) => {
    if (!value) return true; // Skip if empty
    
    const errors = [];
    
    if (options.minLength && value.length < options.minLength) {
      errors.push(`At least ${options.minLength} characters`);
    }
    
    if (options.requireUppercase && !/[A-Z]/.test(value)) {
      errors.push('One uppercase letter');
    }
    
    if (options.requireLowercase && !/[a-z]/.test(value)) {
      errors.push('One lowercase letter');
    }
    
    if (options.requireNumbers && !/[0-9]/.test(value)) {
      errors.push('One number');
    }
    
    if (options.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.push('One special character');
    }
    
    if (errors.length > 0) {
      return message || `Password must include: ${errors.join(', ')}`;
    }
    
    return true;
  };
};

/**
 * Matches validator (for password confirmation, etc.)
 * @param field Reference to another field to match against
 * @param message Custom error message (optional)
 */
export const matches = (field: any, message = 'Fields do not match'): ValidationRule => {
  return (value: any) => {
    if (!value) return true; // Skip if empty
    
    return value === field ? true : message;
  };
};

/**
 * Custom validator with callback function
 * @param validatorFn Custom validation function
 * @param message Default error message
 */
export const custom = (
  validatorFn: (value: any) => boolean,
  message = 'Invalid value'
): ValidationRule => {
  return (value: any) => {
    return validatorFn(value) ? true : message;
  };
};

/**
 * Combine multiple validators
 * @param validators Array of validators to apply
 */
export const compose = (validators: ValidationRule[]): ValidationRule => {
  return (value: any) => {
    for (const validator of validators) {
      const result = validator(value);
      if (result !== true) {
        return result;
      }
    }
    return true;
  };
}; 