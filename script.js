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
  const startBracket = tarrifData.find(({ max }) => max <= unitTotal);
}
