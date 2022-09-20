import fetchMock from 'jest-fetch-mock'

const mockAPIResponse = require('../../src/server/mockAPI.js');
const fetch = require('jest-fetch-mock');

describe ("Testing formHandler functionality", () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  test ('Test URL Request', () => {
    let json = {
        'title': 'test json response',
        'message': 'this is a message',
        'time': 'now'
    }
    expect(mockAPIResponse).toMatchObject(json);
  })

  test ('Test API call', () => {
    let dataObj = {
      confidence: 86,
      agreement: "DISAGREEMENT",
      irony: "NONIRONIC",
      subjectivity: "OBJECTIVE",
      text_analysis_snippet: "(CNN)The Biden administration is largely downplaying https://www.cnn.com/2022/09/18/politics/biden-pandemic-60-minutes"
    };
    
    fetchMock.mockResponseOnce(JSON.stringify(dataObj));

    fetchMock("https://www.cnn.com/2022/09/19/politics/biden-covid-pandemic-over/index.html")
    .then((response) => response.json())
        .then( function (ret) {
            expect(ret).toEqual(dataObj)
        })
    expect(fetchMock.mock.calls[0][0]).toEqual("https://www.cnn.com/2022/09/19/politics/biden-covid-pandemic-over/index.html")
  })
});

