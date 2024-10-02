export function formatNumber(num) {
  // Convert the number to a string and split it into integer and decimal parts
  const [integerPart, decimalPart] = num.toString().split(".");

  // Use a regular expression to add spaces as thousands separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Format the decimal part
  let formattedDecimal = "00"; // Default to "00"
  if (decimalPart) {
    // If there's a decimal part, ensure it has two digits
    formattedDecimal =
      decimalPart.length === 1 ? `${decimalPart}0` : decimalPart;
  }

  // Combine the integer and decimal parts
  return `${formattedInteger}.${formattedDecimal}`;
}
