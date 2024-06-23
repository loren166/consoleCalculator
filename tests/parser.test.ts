import Parser from '../src/parser';

describe('Parser', () => {
    it('Должен корректно вычислять выражения', () => {
        const parser = new Parser('1 + 2');
        expect(parser.decision()).toBe(3);
    });

    it('Должен учитывать последовательность выполнения', () => {
        const parser = new Parser('1 + 2 * 3');
        expect(parser.decision()).toBe(7);
    });

    it('Должен учитывать скобки', () => {
        const parser = new Parser('(1 + 2) * 3');
        expect(parser.decision()).toBe(9);
    });

    it('Должен вывести ошибку при некорректном выражении', () => {
        expect(() => {
            const parser = new Parser('1 +');
            parser.decision();
        }).toThrow('Не хватает символов для вычисления выражения.');
    });
});