"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * undefinedとnullにならない関数と定義する
 * @param argument
 * @param message
 */
exports.ensure = (argument, message = 'This value was promised to be there.') => {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }
    return argument;
};
