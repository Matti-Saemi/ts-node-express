import * as ErrorUtils from '../tools/error-utils';

describe('ErrorUtils', () => { 
    test("It should take an error object and return a string", () => {
        try {
            throw new Error("Some error");
        } catch(err) {
            const formattedError = ErrorUtils.formatError(err.stack);

            expect(typeof formattedError).toBe("string");
        }
    });
    test("It should contain the oriniginal error message", () => {
        try {
            throw new Error("Some error");
        } catch(err) {
            const formattedError = ErrorUtils.formatError(err.stack);

            expect(formattedError).toContain(err.message);
        }
    });
});