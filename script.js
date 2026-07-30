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

// MODAL VARIABLES
const OpenModalBtn1 = document.getElementById("modal-btn-1");
const CloseModalBtn1 = document.getElementById("closeBtn-1");
const dialog1 = document.getElementById("information-modal-1");
const OpenModalBtn2 = document.getElementById("modal-btn-2");
const CloseModalBtn2 = document.getElementById("closeBtn-2");
const dialog2 = document.getElementById("information-modal-2");

const VAT_fraction = 0.13044;

const tarrifData = [
  {
    min: 0,
    max: bracket_1_maxValueField.value,
    price: bracket_1_costField.value,
  },
  {
    min: bracket_1_maxValueField.value,
    max: bracket_2_maxValueField.value,
    price: bracket_2_costField.value,
  },
  {
    min: bracket_2_maxValueField.value,
    max: bracket_3_maxValueField.value,
    price: bracket_3_costField.value,
  },
  {
    min: bracket_3_maxValueField.value,
    max: undefined,
    price: bracket_4_costField.value,
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

bracket_1_maxValueField.addEventListener("input", () => {
  tarrifData[0]["max"] = bracket_1_maxValueField.value;
  tarrifData[1]["min"] = bracket_1_maxValueField.value;
  bracket_2_minValueField.innerText = bracket_1_maxValueField.value;
});

bracket_2_maxValueField.addEventListener("input", () => {
  tarrifData[1]["max"] = bracket_2_maxValueField.value;
  tarrifData[2]["min"] = bracket_2_maxValueField.value;
  bracket_3_minValueField.innerText = bracket_2_maxValueField.value;
});

bracket_3_maxValueField.addEventListener("input", () => {
  tarrifData[2]["max"] = bracket_2_maxValueField.value;
  tarrifData[3]["min"] = bracket_2_maxValueField.value;
  bracket_4_minValueField.innerText = bracket_3_maxValueField.value;
});

bracket_1_costField.addEventListener("input", () => {
  tarrifData[0]["cost"] = bracket_1_costField.value;
});

bracket_2_costField.addEventListener("input", () => {
  tarrifData[1]["cost"] = bracket_2_costField.value;
});

bracket_3_costField.addEventListener("input", () => {
  tarrifData[2]["cost"] = bracket_3_costField.value;
});

bracket_4_costField.addEventListener("input", () => {
  tarrifData[3]["cost"] = bracket_4_costField.value;
});

// MODAL CODE
OpenModalBtn1.addEventListener("click", () => dialog1.showModal());
CloseModalBtn1.addEventListener("click", () => dialog1.close());

OpenModalBtn2.addEventListener("click", () => dialog2.showModal());
CloseModalBtn2.addEventListener("click", () => dialog2.close());

dialog1.addEventListener("click", (e) => {
  const rect = dialog1.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
    dialog1.close();
  }
});

dialog2.addEventListener("click", (e) => {
  const rect = dialog2.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
    dialog2.close();
  }
});
