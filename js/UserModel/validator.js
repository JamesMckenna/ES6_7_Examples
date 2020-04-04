'use strict'
//validator using prototype inheritance, ES6 Module Export and Template Literal 

export const validator = function () { };

validator.prototype.validate = function (property, value) {
    const self = this;
    const rules = property.validator;
    const len = property.strLength;
    const keyRegExp = new RegExp(property.regex);
    const errMsg = property.errMsg;

    return rules.every(function (rule) {
        return self[rule](value, errMsg, keyRegExp, len);
    });
};

validator.prototype.isString = function (value, errMsg, keyRegExp) {
    const testInput = keyRegExp.test(value);
    if (testInput) {
        return true;
    }
    throw new TypeError(`${errMsg} must contain letters only.`);
};
//This prototype is not needed. Input length can be tested in isString with the regular expression 
//but then the error message isn't specific to the error
validator.prototype.strLength = function (value, errMsg, keyRegExp, strLng) {
    if (value.length >= strLng[0] && value.length <= strLng[1]) {
        return true;
    }
    throw new TypeError(`${errMsg} must be between ${strLng[0]} and ${strLng[1]} letters in length.`);
};
validator.prototype.isNotEmpty = function (value, errMsg) {
    //if (value !== '' && value !== null && typeof value !== 'undefined') {
    if (value !== '' && value !== null) {
        return true;
    }
    throw new TypeError(`${errMsg} must have a value.`);
};
validator.prototype.isEmail = function (value, errMsg, keyRegExp) {
    if (value !== '' && value !== null && typeof value !== 'undefined') {
        return true;
    }
    throw new TypeError(`The value entered for ${errMsg} is not a valid email address.`);
};
validator.prototype.isInt = function (value, errMsg) {
    if(Number.isInteger(value)){
        return true;
    }
    throw new TypeError(`The value entered for ${errMsg} is not a number.`);
};