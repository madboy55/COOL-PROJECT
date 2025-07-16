const api = "https://api.exchangerate-api.com/v4/latest/USD";
let search = document.querySelector(".searchBox");
let convert = document.querySelector(".convert");
let fromCurrecy = document.querySelector(".from");
let toCurrecy = document.querySelector(".to");
let finalValue = document.querySelector(".finalValue");
let finalAmount = document.getElementById("finalAmount");

let resultFrom;
let resultTo;
let searchValue;

fromCurrecy.addEventListener("change", (event) => {
  resultFrom = event.target.value;
});

toCurrecy.addEventListener("change", (event) => {
  resultTo = event.target.value;
});

search.addEventListener("input", updateValue);

function updateValue(e) {
  searchValue = e.target.value;
}

convert.addEventListener("click", getResults);

function getResults() {
  if (!resultFrom || !resultTo) {
    alert("Please select both currencies.");
    return;
  }

  if (!searchValue || isNaN(searchValue) || searchValue <= 0) {
    alert("Please enter a valid amount greater than zero.");
    return;
  }

  fetch(api)
    .then((currency) => currency.json())
    .then((data) => {
      let fromRate = data.rates[resultFrom];
      let toRate = data.rates[resultTo];
      let converted = ((toRate / fromRate) * searchValue).toFixed(2);
      finalValue.textContent = converted;
      finalAmount.style.display = "block";

      // Change background color randomly on convert
      changeBackgroundRandom();
    })
    .catch(() => {
      alert("Failed to fetch exchange rates. Please try again later.");
    });
}

function clearVal() {
  search.value = "";
  finalValue.textContent = "";
  finalAmount.style.display = "none";
  fromCurrecy.value = "";
  toCurrecy.value = "";
  resultFrom = null;
  resultTo = null;
  searchValue = null;
  document.body.style.background = "linear-gradient(135deg, #0f0f0f, #1a1a1a, #2b2b2b)";
}

// Function to change background color randomly
function changeBackgroundRandom() {
  const colors = [
    "linear-gradient(135deg, #0f0f0f, #1a1a1a, #2b2b2b)",
    "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
    "linear-gradient(135deg, #667eea, #764ba2)",
    "linear-gradient(135deg, #f7971e, #ffd200)",
    "linear-gradient(135deg, #43cea2, #185a9d)",
    "linear-gradient(135deg, #30cfd0, #330867)",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = randomColor;
}
