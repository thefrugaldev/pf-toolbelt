const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const getDisplayFormattedDate = dateAsString => {
  const date = getDateProps(dateAsString);
  return `${date.month}/${date.day}/${date.year}`;
};

const getDateProps = dateAsString => {
  const date = new Date(dateAsString);
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");

  return {
    month,
    day,
    year
  };
};

export { monthNames, getDisplayFormattedDate };
