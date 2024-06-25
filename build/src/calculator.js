"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const operations_1 = __importDefault(require("./operations"));
const parser_1 = __importDefault(require("./parser"));
class Calculator {
    constructor() {
        this.operations = {};
        this.operations = { ...operations_1.default };
    }
    registerOperation(symbol, precedence, execute) {
        this.operations[symbol] = { precedence, execute };
    }
    decision(expression) {
        const parser = new parser_1.default(expression, this.operations);
        return parser.decision();
    }
}
const calculator = new Calculator();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Введите выражение: ', (input) => {
    try {
        const result = calculator.decision(input);
        console.log(result);
    }
    catch (e) {
        console.error(e);
    }
    finally {
        rl.close();
    }
});
exports.default = Calculator;
