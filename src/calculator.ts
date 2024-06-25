import * as readline from 'readline';
import operations from './operations';
import Parser, {Operation} from './parser';


class Calculator {
    private operations: {[key: string]: Operation} = {}
    constructor() {
        this.operations = {...operations}
    }

    public registerOperation(symbol: string, precedence: number, execute: (a: number, b: number)=> number) {
        this.operations[symbol] = {precedence, execute}
    }

    public decision(expression: string): number {
        const parser = new Parser(expression, this.operations)
        return parser.decision()
    }
}

const calculator = new Calculator()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите выражение: ', (input) => {
    try {
        const result = calculator.decision(input);
        console.log(result);
    } catch (e) {
        console.error(e);
    } finally {
        rl.close();
    }
});

export default Calculator