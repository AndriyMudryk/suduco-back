//https://github.com/vue-generators/vue-form-generator/blob/master/src/utils/validators.js
const errorMessages = {
  fieldIsRequired: "This field is required!",
  invalidFormat: "Invalid format!",

  numberTooSmall: "The number is too small! Minimum: {0}",
  numberTooBig: "The number is too big! Maximum: {0}",
  invalidNumber: "Invalid number",

  textTooSmall: "The length of text is too small! Current: {0}, Minimum: {1}",
  textTooBig: "The length of text is too big! Current: {0}, Maximum: {1}",
  thisNotText: "This is not a text!",

  thisNotArray: "This is not an array!",
  arrayTooSmall: "The length of array is too small! Current: {0}, Minimum: {1}",
  arrayTooBig: "The length of array is too big! Current: {0}, Maximum: {1}",

  selectMinItems: "Select minimum {0} items!",
  selectMaxItems: "Select maximum {0} items!",

  thisNotBoolean: "This is not an boolean!",

  invalidDate: "Invalid date!",
  dateIsEarly: "The date is too early! Current: {0}, Minimum: {1}",
  dateIsLate: "The date is too late! Current: {0}, Maximum: {1}",

  invalidEmail: "Invalid e-mail address!",
  invalidURL: "Invalid URL!"
};

function formatMessage(text) {
  if (text !== null && arguments.length > 1) {
    for (let i = 1; i < arguments.length; i++) {
      text = text.replace("{" + (i - 1) + "}", arguments[i]);
    }
  }
  return text;
}

const rules = {
  isEmpty(value) {
    // checks if `value` is `null` or `undefined` or empty string
    return value === null || value === undefined || value === "";
  },

  isFiniteNumber(value) {
    return typeof value === "number" && isFinite(value);// To exclude `Infinity`, `-Infinity`, and `NaN` which are classified as numbers
  },

  checkEmpty(value, field) {
    if (rules.isEmpty(value)) {
      if (field && field.required) {
        return errorMessages.fieldIsRequired;
      } else {
        return "";
      }
    }
    return null;
  }
};

module.exports = {
  isNumber(value, field = {}) {
    field = field || {};
    let errorMessage = rules.checkEmpty(value, field);
    if (errorMessage !== null) {
      return errorMessage || null;// if empty returning ""
    }
    if (!rules.isFiniteNumber(value)) {
      return errorMessages.invalidNumber;
    }
    if (rules.isFiniteNumber(field.min) && value < field.min) {
      return formatMessage(errorMessages.numberTooSmall, field.min);
    }
    if (rules.isFiniteNumber(field.max) && value > field.max) {
      return formatMessage(errorMessages.numberTooBig, field.max);
    }
    return null;
  },

  isTimestamp(value, field = {}) {
    field = field || {};
    let errorMessage = rules.checkEmpty(value, field);
    if (errorMessage !== null) {
      return errorMessage || null;// if empty returning ""
    }
    // timestamp can be a a type of string. In that case convert it to number
    value = +value;
    if (!rules.isFiniteNumber(value)) {
      return errorMessages.invalidDate;
    }
    if (rules.isFiniteNumber(field.min) && value < field.min) {
      return formatMessage(errorMessages.dateIsEarly, value, field.min);
    }
    if (rules.isFiniteNumber(field.max) && value > field.max) {
      return formatMessage(errorMessages.dateIsLate, value, field.max);
    }
    return null;
  },

  isString(value, field = {}) {
    let errorMessage = rules.checkEmpty(value, field);
    if (errorMessage !== null) {
      return errorMessage || null;// if empty returning ""
    }
    if (typeof value !== "string") {
      return errorMessages.thisNotText;
    }
    const len = value.length;
    if (rules.isFiniteNumber(field.min) && len < field.min) {
      return formatMessage(errorMessages.textTooSmall, len, field.min);
    }
    if (rules.isFiniteNumber(field.max) && len > field.max) {
      return formatMessage(errorMessages.textTooBig, len, field.max);
    }
    return null;
  },

  isPattern(value, field = {}) {
    let errorMessage = rules.checkEmpty(value, field);
    if (errorMessage !== null) {
      return errorMessage || null;// if empty returning ""
    }
    if (!rules.isEmpty(field.pattern)) {
      let reg = new RegExp(field.pattern);
      if (!reg.test(value)) {
        return errorMessages.invalidFormat;
      }
    }
    return null;
  },

  isBoolean(value, field = {}) {
    let errorMessage = rules.checkEmpty(value, field);
    if (errorMessage !== null) {
      return errorMessage || null; // if empty returning ""
    }
    if (typeof value !== "boolean") {
      return errorMessages.thisNotBoolean;
    }
    return null;
  },

  isEmail(value, field = {}) {
    let errorMessage = rules.checkEmpty(value, field);
    if (errorMessage !== null) {
      return errorMessage || null;// if empty returning ""
    }
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
    if (!reg.test(value)) {
      return errorMessages.invalidEmail;
    }
    return null;
  },

  isUrl(value, field = {}) {
    let errorMessage = rules.checkEmpty(value, field);
    if (errorMessage !== null) {
      return errorMessage || null;// if empty returning ""
    }
    let reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g; // eslint-disable-line no-useless-escape
    if (!reg.test(value)) {
      return errorMessages.invalidURL;
    }
    return null;
  },

  isArray(value, field = {}) {
    field = field || {};
    let errorMessage = rules.checkEmpty(value, field);
    if (errorMessage !== null) {
      return errorMessage || null;// if empty returning ""
    }
    if (value.constructor.name !== "Array") {
      return errorMessages.thisNotArray;
    }
    const len = value.length;
    if (rules.isFiniteNumber(field.min) && len < field.min) {
      return formatMessage(errorMessages.arrayTooSmall, len, field.min);
    }
    if (rules.isFiniteNumber(field.min) && len > field.max) {
      return formatMessage(errorMessages.arrayTooBig, len, field.max);
    }
    return null;
  }
};
