export function formatNumber(num) {
  // Convert the number to a string and split it into integer and decimal parts
  const [integerPart, decimalPart] = num.toString().split(".");

  // Use a regular expression to add spaces as thousands separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Format the decimal part
  let formattedDecimal = "000"; // Default to "000"
  if (decimalPart) {
    // If there's a decimal part, ensure it has three digits
    formattedDecimal =
      decimalPart.length === 1
        ? `${decimalPart}00`
        : decimalPart.length === 2
        ? `${decimalPart}0`
        : decimalPart.substring(0, 3); // Truncate to three digits if longer
  }

  // Combine the integer and decimal parts
  return `${formattedInteger}.${formattedDecimal}`;
}

export function formatDateToFrench(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Options for formatting in French
  const options = { year: "numeric", month: "long" };

  // Format the date to "décembre 2024"
  return date.toLocaleString("fr-FR", options);
}
