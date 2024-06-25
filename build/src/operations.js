"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations = {
    '+': { precedence: 1, execute: (a, b) => a + b },
    '-': { precedence: 1, execute: (a, b) => a - b },
    '*': { precedence: 2, execute: (a, b) => a * b },
    '/': { precedence: 2, execute: (a, b) => a / b },
};
exports.default = operations;
