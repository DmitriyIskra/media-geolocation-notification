import validation from "../validation";

const space = '51.34545, -0.34521';
const noSpace = '51.34545,-0.34521';
const squareBrackets  = '[51.34545,-0.34521]';
const valueFalse = '[51,34545,-0,34521]';

test('with space', () => {
    const result = validation(space);

    expect(result).toBe(true);
})

test('no space', () => {
    const result = validation(noSpace);

    expect(result).toBe(true);
})

test('square brackets', () => {
    const result = validation(squareBrackets);

    expect(result).toBe(true);
})

test('false', () => {
    const result = validation(valueFalse);

    expect(result).toBe(false);
})