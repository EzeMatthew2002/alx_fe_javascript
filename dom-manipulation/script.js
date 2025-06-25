let quoteDisplay = document.getElementById("quoteDisplay");
const showNewQuote = document.getElementById("newQuote");
const quotes = [
  {
    text: "The best way the to learn is by ",
    category: "studying",
  },
  { text: "JavaScript is the duct tape of the Internet.", category: "Tech" },
];

function addQuote() {
  let quoteInput = document.getElementById("newQuoteText");
  let categoryInput = document.getElementById("newQuoteCategory");

  let text = quoteInput.value;
  let category = categoryInput.value;

  if (text && category) {
    const newQuote = {
      text: text,
      category: category,
    };

    quotes.push(newQuote);

    quoteInput.value = "";
    categoryInput.value = "";
  } else {
    alert("Please enter both quote text and category");
  }
}

function  displayRandomQuote() {
  const showRandomQuote = Math.floor(Math.random() * quotes.length);
  const quoteOutput = quotes[showRandomQuote];
  quoteDisplay.innerHTML = `"${quoteOutput.text}" - ${quoteOutput.category}`;
}

showNewQuote.addEventListener("click", displayRandomQuote);
