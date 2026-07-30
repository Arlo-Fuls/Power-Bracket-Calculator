const paymentInputField = document.getElementById("amount-paid");

const bracket_1_maxValueField = document.getElementById("b1-max");
const bracket_1_costField = document.getElementById("b1-cost");
const bracket_2_minValueField = document.getElementById("b2-min");
const bracket_2_maxValueField = document.getElementById("b2-max");
const bracket_2_costField = document.getElementById("b2-cost");
const bracket_3_minValueField = document.getElementById("b3-min");
const bracket_3_maxValueField = document.getElementById("b3-max");
const bracket_3_costField = document.getElementById("b3-cost");
const bracket_4_minValueField = document.getElementById("b4-min");
const bracket_4_costField = document.getElementById("b4-cost");

const VAT_fraction = 0.13044;

const tarrifData = [
  {
    min: 0,
    max: 100,
    price: 3.2411,
  },
  {
    min: 100,
    max: 400,
    price: 3.7932,
  },
  {
    min: 400,
    max: 650,
    price: 4.1327,
  },
  {
    min: 650,
    max: undefined,
    price: 4.4551,
  },
];

const paymentData = [];
let unitTotal = 0;

function calculateUnitAmount(payment) {
  const VAT_deduction = payment * VAT_fraction;
  const startBracketIndex = tarrifData.findIndex(({ max }) => max >= unitTotal);
  let paymentRemaining = payment - VAT_deduction;

  if (startBracketIndex >= 0) {
    // loop through first 3 brackets
    for (let i = startBracketIndex; i <= 2; i++) {
      const bracketUnitsRemaining = tarrifData[i]["max"] - unitTotal;
      const bracketCostRemaining = bracketUnitsRemaining * tarrifData[i]["price"];
      console.log(i);

      if (paymentRemaining <= bracketCostRemaining) {
        // payment used up in this bracket
        const unitAdded = paymentRemaining / tarrifData[i]["price"];
        unitTotal += unitAdded;
        paymentRemaining = 0;
        break;
      } else {
        // more money left
        unitTotal += bracketUnitsRemaining;
        paymentRemaining -= bracketCostRemaining;
      }
    }
  }

  if (unitTotal >= tarrifData[3]["max"]) {
    const unitAdded = paymentRemaining / tarrifData[i]["price"];
    unitTotal += unitAdded;
  }

  console.log("unitTotal: ", unitTotal);
}

// Only for testing
paymentInputField.addEventListener("change", () => {
  calculateUnitAmount(paymentInputField.value);
});
