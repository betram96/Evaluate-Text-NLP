import { submitText } from '../../src/client/js/formHandler' 

const fetch = require('jest-fetch-mock');

describe ("Testing submitText functionality", () => {
    beforeEach(() => {
        fetch.resetMocks()
    })
    test("Testing submitText functionality", () => {
        expect(submitText).toBeDefined();
    })
})