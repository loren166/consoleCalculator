"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __importDefault(require("../src/parser"));
describe('Parser', () => {
    it('should correctly parse and evaluate a simple expression', () => {
        const parser = new parser_1.default('1 + 2');
        expect(parser.decision()).toBe(3);
    });
    it('should handle operator precedence', () => {
        const parser = new parser_1.default('1 + 2 * 3');
        expect(parser.decision()).toBe(7);
    });
    it('should handle parentheses', () => {
        const parser = new parser_1.default('(1 + 2) * 3');
        expect(parser.decision()).toBe(9);
    });
    it('should throw an error for invalid expressions', () => {
        expect(() => {
            const parser = new parser_1.default('1 +');
            parser.decision();
        }).toThrow('Не хватает символов для вычисления выражения.');
    });
});
