# Auto Complete Search Input

This is a simple JavaScript web application that help in searching suggestions from an input field. This application give the user a quick suggestion for searching a list of countries. It allows the user to fill the input if he/she clicks on the suggestion.

## Demo

![alt-text]()

## This application is using

- html
- css
- javascript

## This application will cover the following

- `map` function in js
- `filter` function in js
- `Regx` in js

### Implementation

We have 4 files which are as follows.

- index.html
- index.css
- countries.js
- index.js

##### `index.html`

This file contains the html code for the whole application. This is where the entry point `index.js` sat and, this is where the input and the suggestion container sat as well. The code of it looks as follows:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="index.css" />
    <title>Auto Complete</title>
  </head>
  <body>
    <div class="main">
      <div class="main__input">
        <input
          type="text"
          id="main__input__text"
          placeholder="Search keywords"
        />
        <div class="main__suggestions"></div>
      </div>
    </div>
    <script src="index.js" type="module"></script>
  </body>
</html>

```

##### `index.css`

This file contains all the styles for the application. The code in this file looks as follows:

```
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.main {
  width: 100%;
}
.main__input {
  width: 100%;
  max-width: 500px;
  padding: 10px;
  display: flex;
  margin: 10px auto;
  background-color: black;
  flex-direction: column;
}
.main__input > input {
  flex: 1;
  padding: 5px;
  outline: none;
  border: none;
  border-radius: 5px;
}
.main__suggestions {
  background: #f5f5f5;
  margin-top: 0;
  border-radius: 5px !important;
}
.main__suggestion {
  padding: 5px;
  font-size: 15px;
  border-radius: 5px !important;
  user-select: none;
  user-zoom: none;
}
.main__suggestions > .main__suggestion:nth-child(even) {
  background: #fafafa;
}
.main__suggestion:hover {
  background: lightseagreen;
  color: white;
  cursor: pointer;
}

```

##### `countries.js`

This file contains array of countries that we are going to use for suggestions. The structure of this file looks as follows:

```
const countryList = [
  "Afghanistan",
  "Albania",
   ...
  "Zambia",
  "Zimbabwe",
  "Åland Islands",
];

export default countryList;

```

##### `index.js`

This is where the code and the implementation of the auto-completion is. In this file we have 2 main functions, and some event listeners. Which i will go through them step by step.

##### Step 1: Import the countries array

Import the countries array from the `countries.js` file as follows:

```
import countries from "./countries.js";
```

##### Step 2: Create global variables

Create the global variables the one will hold the `results` which is the results list of the suggestions. The `query` is targeting the input from the input field. and finally the `suggestionList` will be the container of the suggestions.

```
const query = document.querySelector("input#main__input__text");
const suggestionList = document.querySelector(".main__suggestions");
//  The result array that will hold all the suggestionList
let result = [];
```

##### Step 3: Listen to the change in input

Add an event listener that will watch the change in the input value of the `query`. Every time the input changes we want to search for the countries that matches the search query so we will pass the query value to the function `search` which will be created after. When the input is `null` which means no suggestions should be shown hence we set the innerHTML of the suggestion to an empty string. The following code does the functionality of getting the input and pass it to the search function.

```
query.addEventListener("input", () => {
  if (query.value.length === 0) {
    suggestionList.innerHTML = "";
  }
  search(query.value);
});
```

##### Step 4: The search function

As it recieves the parameter the search function will then look for matches and update the results array according to the matches. Using the filter function which is fired if the query is not `null` we created a regular expression which will match starting with query and it is matching globally and it's case insensitive. In the event that there are no matches we try to search the countries using the indexing method. If there's any string that is closer to that we update the results array as well. But remember the results should be looped through them and display the suggestions to the user. If the results length is greater than 0 which means suggestions has been found we want to splice and grab the first 5 best results of the suggestion, and pass it to the `showSuggestions` function which will be created after.

```
const search = (query) => {
  // Only search if and only if there's input
  if (query.length > 0) {
    result = countries.filter((country) => {
      /*
    We want the countries that start with the query first
    globally and case insensitive
    */
      const exp = new RegExp(`^${query}`, "gi");
      return country.match(exp);
    });
    if (result.length === 0) {
      // try to search using index
      result = countries.filter((country) => country.indexOf(query) !== -1);
    }
    if (result.length > 0) {
      //   Show the suggestionList to the dom only the first 5
      showSuggestions(result.splice(0, 5));
    }
  }
};
```

##### Step 4: Display the suggestions.

Now we have the suggestions list we can now display them to the user. We will create an `resultHtml` Variable which we populate with arrays of suggestions `div` items with the id `suggest`. We will get an array of `divs` and we will join them using an empty string so that we will get one html tag which will be mounted to the `suggestionList` container div.

```
const showSuggestions = (results) => {
  const resultHtml = results.map((result, index) => {
    return ` <div class="main__suggestion" id="suggest" key=${index}>${result}</div>`;
  });
  suggestionList.innerHTML = resultHtml.join("");
};
```

##### Step 5: Add the clicked suggestion test to the input field.

If the user clicks on the suggestion then we should add the text of the suggestion to the input field. So we will listen to the event click on the document and check if the target has an id of `suggest`. If thats the case we grab the innerText and change the value of the input field to that. Then `results` and `suggestionList` should be restored.

```
document.addEventListener("click", function (event) {
  if (event.target && event.target.id == "suggest") {
    query.value = event.target.innerText;
    suggestionList.innerHTML = "";
    result = [];
  }
});
```

##### The `index.js` file

This is the code of the index.js file in one place.

```
import countries from "./countries.js";

const query = document.querySelector("input#main__input__text");
const suggestionList = document.querySelector(".main__suggestions");
//  The result array that will hold all the suggestionList
let result = [];
query.addEventListener("input", () => {
  if (query.value.length === 0) {
    suggestionList.innerHTML = "";
  }
  search(query.value);
});
const search = (query) => {
  // Only search if and only if there's input
  if (query.length > 0) {
    result = countries.filter((country) => {
      /*
    We want the countries that start with the query first
    globally and case insensitive
    */
      const exp = new RegExp(`^${query}`, "gi");
      return country.match(exp);
    });
    if (result.length === 0) {
      // try to search using index
      result = countries.filter((country) => country.indexOf(query) !== -1);
    }
    if (result.length > 0) {
      //   Show the suggestionList to the dom only the first 5
      showSuggestions(result.splice(0, 5));
    }
  }
};

const showSuggestions = (results) => {
  const resultHtml = results.map((result, index) => {
    return ` <div class="main__suggestion" id="suggest" key=${index}>${result}</div>`;
  });
  suggestionList.innerHTML = resultHtml.join("");
};

document.addEventListener("click", function (event) {
  if (event.target && event.target.id == "suggest") {
    query.value = event.target.innerText;
    suggestionList.innerHTML = "";
    result = [];
  }
});

```

### Credits

- [Stackoverflow](https://stackoverflow.com/)
