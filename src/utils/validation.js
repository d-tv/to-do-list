import validator from 'validator';

export function validateUserEmail(email) {
  if (typeof email != 'string') {
    return false;
  }
  return validator.isEmail(email);
}

export function validateUserPassword(password) {
  if (typeof password != 'string') {
    return false;
  }
  return validator.isLength(password, { min: 8 });
}

export function validateTaskId(id) {
  if (typeof id != 'string') {
    return false;
  }
  return validator.isNumeric(id);
}

export function validateTaskTitle(title) {
  if (typeof title != 'string') {
    return false;
  }
  return validator.isLength(title, { min: 1 });
}

export function validateTaskDescription(desc) {
  if (typeof desc != 'string') {
    return false;
  }
  return validator.isLength(desc, { min: 1 });
}

export function validateTaskStatus(status) {
  if (typeof status != 'boolean') {
    return false;
  }
  return true;
}
