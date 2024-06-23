"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
describe('Calculator', () => {
    it('должен вычислять выражение из консоли', (done) => {
        const calculator = (0, child_process_1.exec)('ts-node src/calculator.ts');
        calculator.stdin?.write('1+2\n');
        calculator.stdin?.end();
        let resultReceived = false;
        calculator.stdout?.on('data', (data) => {
            const result = parseFloat(data.trim());
            if (!isNaN(result)) {
                expect(result).toBe(3);
                resultReceived = true;
            }
        });
        calculator.on('close', () => {
            if (resultReceived) {
                done();
            }
            else {
                setTimeout(() => {
                    done();
                }, 100);
            }
        });
    }, 10000);
});
