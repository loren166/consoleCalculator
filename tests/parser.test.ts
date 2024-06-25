import Calculator from '../src/calculator';

describe('Calculator', () => {
    let calculator: Calculator;

    beforeAll(() => {
        calculator = new Calculator();
        calculator.registerOperation('^', 3, (a, b) => Math.pow(a, b) )
    });

    it('Должен корректно вычислять выражения', () => {
        expect(calculator.decision('1 + 2')).toBe(3);
    });

    it('Должен учитывать последовательность выполнения', () => {
        expect(calculator.decision('1 + 2 * 3')).toBe(7);
    });

    it('Должен учитывать скобки', () => {
        expect(calculator.decision('(1 + 2) * 3')).toBe(9);
    });

    it('Должен учитывать степень', () => {
        expect(calculator.decision('(2 + 1) ^ 3')).toBe(27);
    });

    it('Должен учитывать отрицательные числа', () => {
        expect(calculator.decision('-1 + 2 * 3')).toBe(5);
    });

    it('Должен вывести ошибку при некорректном выражении', () => {
        expect(() => {
            calculator.decision('1 +');
        }).toThrow('Не хватает символов для вычисления выражения.');
    });
});