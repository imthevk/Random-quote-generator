const quoteContainer = document.getElementById("container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// show loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading
function completeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API
async function getQuote() {
  showLoadingSpinner();
  //   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "http://quotes.stormconsultancy.co.uk/random.json";
  // "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    //if author is blank , add 'Unknown'
    if (data.author === " ") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.author;
    }
    if (data.quote > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quote;
    //stop loader, show quote
    completeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}
//
// tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on Load
getQuote();
