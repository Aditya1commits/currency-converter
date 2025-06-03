const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.value = code;
    newOption.textContent = code;
    select.appendChild(newOption);
  }

  // Set default currencies
  if (select.classList.contains("from")) {
    select.value = "USD";
  } else if (select.classList.contains("to")) {
    select.value = "INR";
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update flag image based on selected currency
function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

// Perform conversion on button click
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = parseFloat(amount.value);
  if (isNaN(amtVal) || amtVal <= 0) {
    amtVal = 1;
    amount.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  try {
    const response = await fetch(`${BASE_URL}${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const convertedAmount = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    msg.innerText = "Something went wrong. Please try again.";
    console.error("Error fetching data:", error);
  }
});
