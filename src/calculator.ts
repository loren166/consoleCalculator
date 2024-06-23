import * as readline from 'readline';
import Parser from './parser';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите выражение: ', (input) => {
    try {
        const parser = new Parser(input);
        const result = parser.decision();
        console.log(result);
    } catch (e) {
        console.error(e);
    } finally {
        rl.close();
    }
});