let quoteDisplay = document.getElementById("quoteDisplay");
const showNewQuote = document.getElementById("newQuote");
const quotes = [
  {
    text: "The best way the to learn is by ",
    category: "studying",
  },
  { text: "JavaScript is the duct tape of the Internet.", category: "Tech" },
];

const formArea = document.getElementById("formArea");

const quoteInput = document.createElement("input");
quoteInput.type = "text";
quoteInput.id = "newQuoteText";
quoteInput.placeholder = "Enter a new quote";

const categoryInput = document.createElement("input");
categoryInput.type = "text";
categoryInput.id = "newQuoteCategory";
categoryInput.placeholder = "Enter quote category";

const addBtn = document.createElement("button");
addBtn.textContent = "Add Quote";
addBtn.onclick = function () {
  const text = quoteInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    const newQuote = {
      text,
      category,
    };
    quotes.push(newQuote);

    quoteInput.value = "";
    categoryInput.value = "";
  } else {
    alert("Please enter both quote text and category");
  }
};


formArea.appendChild(quoteInput);
formArea.appendChild(categoryInput);
formArea.appendChild(addBtn);

function displayRandomQuote() {
  const showRandomQuote = Math.floor(Math.random() * quotes.length);
  const quoteOutput = quotes[showRandomQuote];
  quoteDisplay.innerHTML = `"${quoteOutput.text}" - ${quoteOutput.category}`;
}

showNewQuote.addEventListener("click", displayRandomQuote);
