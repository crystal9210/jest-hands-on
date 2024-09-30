import { add , subtract } from '../math';

describe('Math Functions', () => {
    test('add should correctly add two numbers', () => {
        expect(add(1,2)).toBe(3);
    });

    test('subtract should correctly add two numbers', () => {
        expect(subtract(5,3)).toBe(2);
    });
})