# Validation Rules Utility

A collection of validation functions to use with `SimpleInput`, `SimpleForm`, and other form components.

## Basic Usage

Import the validation functions you need:

```ts
import { required, email, minLength } from '../utils/ValidationRules'
```

Then use them with your form inputs:

```vue
<SimpleInput
  v-model="email"
  type="email"
  :validation="email()"
  placeholder="Enter your email"
/>

<SimpleInput
  v-model="username"
  :validation="minLength(3, 'Username must be at least 3 characters')"
  placeholder="Choose a username"
/>
```

## Composing Validators

You can compose multiple validators using the `compose` function:

```vue
<SimpleInput
  v-model="password"
  type="password"
  :validation="compose([
    required(),
    minLength(8),
    password()
  ])"
  placeholder="Enter your password"
/>
```

## Available Validators

### Basic Validators

- `required(message?)`: Validates that a field has a value
- `email(message?)`: Validates that the value is a valid email address
- `url(message?)`: Validates that the value is a valid URL
- `numeric(message?)`: Validates that the value is a number

### String Validators

- `minLength(min, message?)`: Validates minimum string length
- `maxLength(max, message?)`: Validates maximum string length
- `pattern(regex, message?)`: Validates against a regular expression

### Number Validators

- `min(min, message?)`: Validates minimum numeric value
- `max(max, message?)`: Validates maximum numeric value

### Special Validators

- `password(options?, message?)`: Validates password strength with configurable options
- `matches(otherField, message?)`: Validates that a field matches another field (useful for password confirmation)

### Custom Validators

- `custom(validatorFn, message?)`: Create a custom validator with your own logic

## Examples

### Password Validation

```vue
<SimpleInput
  v-model="password"
  type="password"
  fieldset
  fieldsetLegend="Password"
  :validation="password({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecial: true
  })"
  placeholder="Create a secure password"
/>
```

### Custom Validator

```vue
<script setup>
import { custom } from '../utils/ValidationRules'

// Custom validator to check if username is available
const usernameAvailable = custom(async (value) => {
  if (!value) return true
  
  // Call API to check if username is available
  const response = await checkUsernameAvailable(value)
  return response.available
}, 'Username is already taken')
</script>

<template>
  <SimpleInput
    v-model="username"
    :validation="usernameAvailable"
    placeholder="Choose a username"
  />
</template>
```

### Age Validation

```vue
<SimpleInput
  v-model="age"
  type="number"
  fieldset
  fieldsetLegend="Age"
  :validation="compose([
    required('Age is required'),
    numeric(),
    min(18, 'You must be 18 or older')
  ])"
  placeholder="Enter your age"
/>
```

## Creating Your Own Validation Rules

You can create custom validation rules by implementing the `ValidationRule` type:

```ts
import type { ValidationRule } from '../utils/ValidationRules'

// Create a validation rule that checks if a string is a valid postal code
const postalCode = (message = 'Invalid postal code'): ValidationRule => {
  return (value: any) => {
    if (!value) return true // Skip if empty
    
    // Use your country-specific regex pattern
    const postalCodeRegex = /^\d{5}(-\d{4})?$/
    return postalCodeRegex.test(value) ? true : message
  }
} 