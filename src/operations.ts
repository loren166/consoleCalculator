import {Operation} from "./parser";


const operations: {[key: string]: Operation} = {
    '+': {precedence: 1, execute: (a, b) => a+b},
    '-': {precedence: 1, execute: (a, b) => a-b},
    '*': {precedence: 2, execute: (a, b) => a*b},
    '/': {precedence: 2, execute: (a, b) => a/b},
}

export default operations;