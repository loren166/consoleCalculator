"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parser {
    constructor(expression, operations) {
        this.currentIndex = 0;
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
                else if (/[+\-*/^]/.test(match)) {
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
    parseExponentiation() {
        let result = this.parsePrimary();
        while (true) {
            const token = this.tokens[this.currentIndex];
            if (!token || token.type !== 'operator' || token.value !== '^') {
                break;
            }
            this.getNextToken();
            result = this.operations['^'].execute(result, this.parsePrimary());
        }
        return result;
    }
    parseTerm() {
        let result = this.parseExponentiation();
        while (true) {
            const token = this.tokens[this.currentIndex];
            if (!token || (token.type !== 'operator' || (token.value !== '*' && token.value !== '/'))) {
                break;
            }
            const operation = this.operations[token.value];
            if (operation.precedence !== 2) {
                break;
            }
            this.getNextToken();
            result = operation.execute(result, this.parseExponentiation());
        }
        return result;
    }
    parseExpression() {
        let result = this.parseTerm();
        while (true) {
            const token = this.tokens[this.currentIndex];
            if (!token || (token.type !== 'operator' || (token.value !== '+' && token.value !== '-'))) {
                break;
            }
            const operation = this.operations[token.value];
            this.getNextToken();
            result = operation.execute(result, this.parseTerm());
        }
        return result;
    }
    decision() {
        this.currentIndex = 0;
        return this.parseExpression();
    }
}
exports.default = Parser;
