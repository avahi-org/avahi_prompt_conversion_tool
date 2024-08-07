export const calculateAmmount = (value1: number, value2: number) => {
  if (typeof value1 !== 'number' || typeof value2 !== 'number') {
    throw new Error('Both inputs must be numbers.');
  }

  let isUp = false;

  const amountDifference = value2 - value1;
  // const average = (value1 + value2) / 2;
  // const percentageDifference = (amountDifference / average) * 100;
  const percentageDifference = 100 - (value2 * 100) / value1;

  // return percentageDifference;

  // const amountDifference = value2 - value1;
  // const percentageDifference =
  //   value1 !== 0 ? ((value2 - value1) / value1) * 100 : 0;
  // value1 !== 0 ? (value2 * 100) / value1 : 0;

  if (value2 < value1) {
    isUp = true;
  }

  return {
    isUp,
    amountDifference,
    percentageDifference,
  };
};
