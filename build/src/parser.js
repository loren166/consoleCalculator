"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parser {
    constructor(expression, operations) {
        this.currentIndex = 0;
        this.parenthesesBalance = 0;
        this.tokens = [];
        this.expression = expression;
        this.operations = operations;
        this.tokenize();
    }
    tokenize() {
        const regex = /-?\d+(\.\d+)?|[+\-*/^()]/g;
        const matches = this.expression.match(regex);
        if (matches) {
            for (const match of matches) {
                if (/\d/.test(match) || (match.length > 1 && match[0] === '-' && /\d/.test(match[1]))) {
                    this.tokens.push({ type: 'number', value: match });
                }
                else if (this.operations[match]) {
                    this.tokens.push({ type: 'operator', value: match });
                }
                else if (/[()]/.test(match)) {
                    this.tokens.push({ type: 'parenthesis', value: match });
                    if (match === '(') {
                        this.parenthesesBalance++;
                    }
                    else if (match === ')') {
                        this.parenthesesBalance--;
                        if (this.parenthesesBalance < 0) {
                            throw new Error('Лишняя закрывающая скобка.');
                        }
                    }
                }
            }
        }
    }
    getNextToken() {
        return this.tokens[this.currentIndex++] || null;
    }
    peekNextToken() {
        return this.tokens[this.currentIndex] || null;
    }
    decision() {
        const operandStack = [];
        const operatorStack = [];
        while (true) {
            const token = this.getNextToken();
            if (!token) {
                break;
            }
            if (token.type === 'number') {
                operandStack.push(parseFloat(token.value));
            }
            else if (token.type === 'operator') {
                const nextToken = this.peekNextToken();
                if (!nextToken || nextToken.type === 'operator' || nextToken.value === ')') {
                    throw new Error('Не хватает символов для вычисления выражения.');
                }
                while (operatorStack.length > 0) {
                    const topOperator = operatorStack[operatorStack.length - 1];
                    const currentOperation = this.operations[token.value];
                    const topOperation = this.operations[topOperator];
                    if (topOperation && (topOperation.precedence > currentOperation.precedence ||
                        (topOperation.precedence === currentOperation.precedence && token.value !== '^'))) {
                        operatorStack.pop();
                        const b = operandStack.pop();
                        const a = operandStack.pop();
                        operandStack.push(topOperation.execute(a, b));
                    }
                    else {
                        break;
                    }
                }
                operatorStack.push(token.value);
            }
            else if (token.value === '(') {
                operatorStack.push(token.value);
            }
            else if (token.value === ')') {
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                    const topOperator = operatorStack.pop();
                    const b = operandStack.pop();
                    const a = operandStack.pop();
                    operandStack.push(this.operations[topOperator].execute(a, b));
                }
                if (operatorStack.length === 0 || operatorStack.pop() !== '(') {
                    throw new Error('Лишняя закрывающая скобка.');
                }
            }
        }
        while (operatorStack.length > 0) {
            const topOperator = operatorStack.pop();
            const b = operandStack.pop();
            const a = operandStack.pop();
            operandStack.push(this.operations[topOperator].execute(a, b));
        }
        if (this.parenthesesBalance !== 0) {
            throw new Error('Неправильный баланс скобок в выражении.');
        }
        return operandStack[0];
    }
}
exports.default = Parser;
