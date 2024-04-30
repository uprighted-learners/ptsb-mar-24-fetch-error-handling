const ajaxBtn = document.getElementById("ajaxBtn");

ajaxBtn.addEventListener("click", () => {
    // AJAX Call Get Method
    let request = new XMLHttpRequest();

    request.open("GET", "https://jsonplaceholder.typicode.com/posts/1");
    request.onload = function() {
        const data = JSON.parse(request.responseText);
        console.log("data", data);
    }
    request.send();
})

const fetchGETBtn = document.getElementById("fetchGETBtn");

fetchGETBtn.addEventListener("click", async () => {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        // We can only complete the response once. So once we get the data in whatever format, we cannot get it again
        // let text = await response.text();
        // console.log(text);
        let json = await response.json();
        console.log(json);

        if (!response.ok) {
            throw Error("I AM NOT OK") // Manually throw error. This will put us within our catch block
        }
    } catch (errorFromResponse) {
        //Any Errors, from you or others, in the try block will trigger this catch block
        console.log(errorFromResponse);
        alert(errorFromResponse)
    }

})

const fetchREADME = document.getElementById("fetchREADME");
fetchREADME.addEventListener("click", async () => {
    // Using fetch to read the content of our README file
    let response = await fetch("/README.md");
    let readme = await response.text();
    console.log(readme);
})

const parseJsonBtn = document.getElementById("parseJson");
parseJsonBtn.addEventListener("click", () => {
    let myText = '{ "data": "some data goes here" }'; //Manually crafted json object as a string
    let myObject = JSON.parse(myText); // JSON.parse will convert a json object string into a JSON object
    console.log(myObject)
})

const postForm = document.getElementById("postForm");
// POST <> CREATE - is for sending data
postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // METHOD 1 of sending data using fetch
    const data = {
        userId: e.target.userId.value,
        body: e.target.body.value,
        title: e.target.title.value
    }

    // METHOD 2 of sending data using fetch
    // use form element to construct a FormData object
    const formData = new FormData(postForm);

    // Look at the contents of our formData object
    for (let [key, value] of formData) {
        console.log("key", key);
        console.log("value", value)
    }

    try {
        // Sending a POST request using fetch
        // method: identifies the type of request we are trying to make
        // body: the content we are sending. This is data from our form. We want to make this object into a JSON string
        let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData)), //Use a Object.fromEntries() for our formData to create a standard object and then do JSON.stringify there
            headers: { // Let the server know that we will be sending data in the format of JSON
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        let json = await response.json(); //Convert response from api into a JSON object.
        console.log(json);

    } catch (err) {
        console.log(err);
    }
});

// The document has an event listener for when the HTML content is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
    try {
        //Make GET response to placeholder API
        let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        let json = await response.json();

        console.log(json);

        // Populate our put form with data from the API
        const form = document.getElementById("putForm");
        form.id.value = json.id;
        form.title.value = json.title;
        form.body.value = json.body,
        form.userId.value = json.userId

        if (!response.ok) {
            throw Error("I AM NOT OK")
        }
    } catch (errorFromResponse) {
        //Any Errors, from you or others, in the try block will trigger this catch block
        console.log(errorFromResponse);
        alert(errorFromResponse)
    }
})

const putForm = document.getElementById("putForm");
putForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Create body data object for sending to the api
    const data = {
        id: e.target.id.value,
        userId: e.target.userId.value,
        body: e.target.body.value,
        title: e.target.title.value
    }

    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: "PUT", // For method, indicate we are sending a PUT method
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });

        let json = await response.json();
        console.log(json);
    } catch (err) {
        console.log(err)
    }
});

const deleteForm = document.getElementById("deleteForm");
deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    console.log(isNaN(id));

    // Client side validation
    if (isNaN(id)){ // Check if id is Not a Number (NaN)
        // If so, do the following:
        console.log("this is not a number");
        // Showcase our banner
        const errorBanner = document.getElementById("deleteBanner");
        errorBanner.style.display = "block";

        // After 3 seconds, hide our banner so it doesn't stay forever.
        setTimeout(() => {
            errorBanner.style.display = "none";
        }, 3000)
        return;
    }

    // You can also disable the banner once you give and submit a valid value for id
    if (!isNaN(id)) {
        const errorBanner = document.getElementById("deleteBanner");
        errorBanner.style.display = "none";
    }

    try {
        // Use the id within the api link to make sure we identify a specific id
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "DELETE" // Indicate the method to DELETE
        })

        let data = await response.json(); // Sometimes we may receive data back from an API after a delete. Not always the case. This API doesn't.
        console.log(data);
    } catch (err) {
        console.log(err);
    }
})