export const capitalize = (str) => {
  return str
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter and keep the rest as is
    .join(" "); // Join the words back into a string
};

export const generateClassCode = () => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 6) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const generateRandomBannerColor = () => {
  const COLORS = [
    "#0277BD",
    "#FF8A66",
    "#36474F",
    "#009788",
    "#00695B",
    "#566E7A",
    "#FAA723",
    "#32AC71",
  ];

  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short", // Short weekday, e.g., "Sat"
    year: "numeric", // Four-digit year
    month: "short", // Short month, e.g., "Nov"
    day: "2-digit", // Two-digit day
    hour: "numeric", // Hour
    minute: "2-digit", // Two-digit minutes
    hour12: true,
  }).format(date);
};
