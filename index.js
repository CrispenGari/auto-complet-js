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
