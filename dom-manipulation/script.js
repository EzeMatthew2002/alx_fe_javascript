let quoteDisplay = document.getElementById("quoteDisplay");
const showNewQuote = document.getElementById("newQuote");

let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The best way to predict the future is to invent it.",
    category: "Inspiration",
  },
  {
    text: "JavaScript is the duct tape of the Internet.",
    category: "Tech",
  },
];

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function addQuote() {
  const createAddQuoteForm = document.getElementById("formArea");

  if (
    document.getElementById("newQuoteText") ||
    document.getElementById("newQuoteCategory")
  ) {
    return;
  }

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
    let text = quoteInput.value.trim();
    let category = categoryInput.value.trim();

    if (text && category) {
      const newQuote = {
        text,
        category,
      };

      quotes.push(newQuote);
      saveQuotes();
    } else {
      alert("Please enter both quote text and category");
    }
  };

  createAddQuoteForm.appendChild(quoteInput);
  createAddQuoteForm.appendChild(categoryInput);
  createAddQuoteForm.appendChild(addBtn);
}
addQuote();

function displayRandomQuote() {
  const showRandomQuote = Math.floor(Math.random() * quotes.length);
  const quoteOutput = quotes[showRandomQuote];
  quoteDisplay.innerHTML = `"${quoteOutput.text}" - ${quoteOutput.category}`;

  sessionStorage.setItem("lastQuote", JSON.stringify(quoteOutput));
}

function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid format. Must be an array of quotes.");
      }
    } catch (e) {
      alert("Invalid JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

showNewQuote.addEventListener("click", displayRandomQuote);

// Load last shown quote from sessionStorage (optional)
const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
if (lastQuote) {
  quoteDisplay.textContent = `"${lastQuote.text}" - ${lastQuote.category}`;
}
