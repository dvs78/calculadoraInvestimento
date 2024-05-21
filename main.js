import { generateReturnsArray } from "./investimentGoals";

const form = document.getElementById("investment-form");
// const calculateButton = document.getElementById("calculate-results");

function renderProgression(event) {
  event.preventDefault();
  const startingAmount = Number(
    form["starting-amount"].value.replace(",", ".")
  );
  // const startingAmount = Number(
  //   document.getElementById("starting-amount").value
  // );
  const additionalContribution = Number(
    document.getElementById("additional-contribution").value.replace(",", ".")
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  console.log(returnsArray);
}

function validateInput(event) {
  if (event.target.value === "") {
    return;
  }

  const { parentElement } = event.target;
  const grandParentElement = event.target.parentElement.parentElement;
  const inputValue = event.target.value.replace(",", ".");

  if (
    isNaN(inputValue) ||
    (Number(inputValue) <= 0 && !parentElement.classList.contains(error))
  ) {
    const errorTextElment = document.createElement("p");
    errorTextElment.classList.add("text-red-500");
    errorTextElment.classList.add("text-xs");
    errorTextElment.innerText = "Insira um valor numérico e maior que zero";

    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElment);
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  } //tagName: vem com o nome da tag em maiúsculo e hasAttribute: é um booleano
}

form.addEventListener("submit", renderProgression);
// calculateButton.addEventListener("click", renderProgression);
