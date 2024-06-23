"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parser {
    constructor(expression) {
        this.currentIndex = 0;
        this.tokens = [];
        this.expression = expression;
        this.tokenize();
    }
    tokenize() {
        const regex = /\d+(\.\d+)?|[+\-*/()]/g;
        const matches = this.expression.match(regex);
        if (matches) {
            for (const match of matches) {
                if (/\d/.test(match)) {
                    this.tokens.push({ type: 'number', value: match });
                }
                else if (/[+\-*/]/.test(match)) {
                    this.tokens.push({ type: 'operator', value: match });
                }
                else if (/[()]/.test(match)) {
                    this.tokens.push({ type: 'parenthesis', value: match });
                }
            }
        }
    }
    getNextToken() {
        return this.tokens[this.currentIndex++] || null;
    }
    parseNumber(token) {
        return parseFloat(token.value);
    }
    parsePrimary() {
        const token = this.getNextToken();
        if (!token) {
            throw new Error('Не хватает символов для вычисления выражения.');
        }
        if (token.type === 'number') {
            return this.parseNumber(token);
        }
        if (token.type === 'parenthesis' && token.value === '(') {
            const value = this.parseExpression();
            const closingParanth = this.getNextToken();
            if (!closingParanth || closingParanth.value !== ')') {
                throw new Error('Не хватает закрывающей скобки в выражении.');
            }
            return value;
        }
        throw new Error(`Неизвестный токен: ${token.value}`);
    }
    parseTerm() {
        let result = this.parsePrimary();
        while (true) {
            const token = this.tokens[this.currentIndex];
            if (!token || (token.type !== 'operator' || (token.value !== '*' && token.value !== '/'))) {
                break;
            }
            this.getNextToken();
            if (token.value === '*') {
                result *= this.parsePrimary();
            }
            else if (token.value === '/') {
                result /= this.parsePrimary();
            }
        }
        return result;
    }
    parseExpression() {
        let result = this.parseTerm();
        while (true) {
            const token = this.tokens[this.currentIndex];
            if (!token || (token.value !== '+' && token.value !== '-')) {
                break;
            }
            this.getNextToken();
            if (token.value === '+') {
                result += this.parseTerm();
            }
            else if (token.value === '-') {
                result -= this.parseTerm();
            }
        }
        return result;
    }
    decision() {
        this.currentIndex = 0;
        return this.parseExpression();
    }
}
exports.default = Parser;
