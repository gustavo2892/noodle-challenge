const CalculateNoodleTimeService = (noodleTimeTotal, hourglassTimeA, hourglassTimeB) => {
  let calculateTotalTime = 0;
  let auxHourglassTimeA = hourglassTimeA;
  let auxHourglassTimeB = hourglassTimeB;
  let differenceTime = NaN;
  let possibleExactTime = false;
  
  while (differenceTime != 0) {
    if (auxHourglassTimeA > auxHourglassTimeB) {
      differenceTime = auxHourglassTimeA - auxHourglassTimeB;
      calculateTotalTime += auxHourglassTimeB;
      auxHourglassTimeA = differenceTime;
      auxHourglassTimeB = hourglassTimeB;
    } else {
      differenceTime = auxHourglassTimeB - auxHourglassTimeA;
      calculateTotalTime += auxHourglassTimeA;
      auxHourglassTimeA = hourglassTimeA;
      auxHourglassTimeB = differenceTime;
    }

    if (differenceTime == noodleTimeTotal) {
      calculateTotalTime += noodleTimeTotal;
      possibleExactTime = true;
      break;
    }
  }

  if (possibleExactTime) {
    return calculateTotalTime;
  }

  return false;
};

module.exports = CalculateNoodleTimeService;