// HTML element(s)
const confidence = document.getElementById('confidence');
const subjectivity = document.getElementById('subjectivity');
const agreement = document.getElementById('agreement');
const text_snippet = document.getElementById('text_snippet');
const textInput = document.getElementById('textInput');

// This function is called when the Submit button is clicked
// First, it grabs the value in the input field (URL)
// Then send this URL to the server
// The server uses this URL to send the GET request to MeaningCloud then send the info received back to client
// Lastly, client presents this info in UI
function submitText (event) {
    event.preventDefault();
    let urlInput = textInput.value;
    // Make sure user enter url
    if (urlInput != ''){
        postTextToServer({urlInput})
        .then (function (data) {
            // Make sure user enters a valid URL
            if (data.status == 200 || data.status == 100) {
                alert("You did not enter a valid URL. Try again!")
            } else {
                displayResults(data);
            }
        });
    } else {
        alert("Enter URL in input field!");
    }
}

// This method sends the inputted URL to server
const postTextToServer = async (input = '') => {
    const postMsg = await fetch ('/analyzeText', {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
    },
        body: JSON.stringify(input)
    });
    try {
        // Wait for server to send back response to make sure our request was successful
        const sentData = await postMsg.json();
        // Log this data to console for debugging
        console.log("News analysis results ", sentData);
        return sentData;
      } catch (e) {
        console.log("Error getting data from server: ", e);
    }
}

// Use the info sent back from server to present in the UI
const displayResults = async (data) => {
    if (data != ''){
        confidence.innerHTML = `Confidence: ${data.confidence}`;
        agreement.innerHTML = `Agreement: ${data.agreement}`;
        subjectivity.innerHTML = `Subjectivity: ${data.subjectivity}`;
        text_snippet.innerHTML = `Text Snippet: ${data.text_analysis_snippet}`;

        // Reset input field
        textInput.value = "";
    } else{
        console.log("No results available");
    }
}
export { submitText }