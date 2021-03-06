jest.mock('fs');
let {parseJsonEntityFile, getJsonFilesInFolder } = require('../utility')

describe('ParseJsonEntityFile tests', () => {
    test('should return ENOENT', () => {
        return parseJsonEntityFile('errorpath').then(
            ()=> fail('Should call reject method on promise, not fullfiled'),
            (err) => expect(err.message).toBe('ENOENT')
        );
    });

    test('test valid entity', () => {
        const validEntity = {
            name: "string",
            age: "number"
        };

        return parseJsonEntityFile('validpath').then(
            (data) => {
                expect(data).toMatchObject(validEntity)
            },
            () => fail('Should call fullfiled method on promise, not rejected')
        );
    })
});

describe('getJsonFilesInFolder tests', () => {
    test('test empty folder', () => {
        return getJsonFilesInFolder('emptyFolder').then(
            (data) => { expect(data).toMatchObject([]) },
            () => fail('Should call fullfiled method on promise, not rejected')
        )
    });

    test('test mixed extension folder', () => {
        return getJsonFilesInFolder('mixedExtensionFolder').then(
            (data) => { expect(data).toMatchObject(['Person.json']) },
            () => fail('Should call fullfiled method on promise, not rejected')
        )
    });

    test('test json only extension folder', () => {
        return getJsonFilesInFolder('jsonOnlyFolder').then(
            (data) => { expect(data).toMatchObject(['Person.json', 'Book.json']) },
            () => fail('Should call fullfiled method on promise, not rejected')
        )
    });
});