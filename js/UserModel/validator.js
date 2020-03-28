'use strict'
//validator using prototype inheritance, ES6 Module Export and Template Literal 

export const validator = function () {};
validator.prototype.validate = function (value, keyname, property) {
    let self = this;
    let rules = property.validator;
    let len = property.strLength;
    let keyRegExp = new RegExp(property.regex);

    return rules.every(function (rule) {
        return self[rule](value, keyname, keyRegExp, len);
    });
};
validator.prototype.isString = function (value, keyname, keyRegExp) {
    const testInput = keyRegExp.test(value);
    if (testInput) {
        return true;
    }
    throw new Error(`${keyname} must contain letters only.`);
};
//This prototype is not needed. Input length can be tested in isString with the regular expression 
//but then the error message isn't specific to the error
validator.prototype.strLength = function (value, keyname, keyRegExp, strLng) {
    if (value.length >= strLng[0] && value.length <= strLng[1]) {
        return true;
    }
    throw new Error(`${keyname} must be between ${strLng[0]} and ${strLng[1]} letters in length.`);
};
validator.prototype.isNotEmpty = function (value, keyname) {
    if (value !== '' && value !== null && typeof value !== 'undefined') {
        return true;
    }
    throw new Error(`${keyname} must have a value.`);
};
validator.prototype.isInt = function () {
    return Number.isInteger(value);
};