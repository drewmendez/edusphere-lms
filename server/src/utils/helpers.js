export const capitalize = (str) => {
  return str
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter and keep the rest as is
    .join(" "); // Join the words back into a string
};
