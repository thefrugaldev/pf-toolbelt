const budgets = [
  {
    id: 1,
    title: "LGE",
    category: "Electricity",
    month: 1,
    day: 20,
    year: 2019,
    userId: 1
  },
  {
    id: 2,
    title: "Louisville Water",
    category: "Water",
    month: 1,
    day: 1,
    year: 2019,
    userId: 1
  },
  {
    id: 3,
    title: "Target",
    category: "Shopping",
    month: 1,
    day: 15,
    year: 2019,
    userId: 1
  },
  {
    id: 4,
    title: "LGE",
    category: "Electricity",
    month: 2,
    day: 20,
    year: 2019,
    userId: 1
  },
  {
    id: 5,
    title: "Movie Theatre",
    category: "Entertainment",
    month: 2,
    day: 12,
    year: 2019,
    userId: 1
  },
  {
    id: 6,
    title: "Red Lobster",
    category: "Eating Out",
    month: 2,
    day: 17,
    year: 2019,
    userId: 1
  },
  {
    id: 7,
    title: "LGE",
    category: "Electricity",
    month: 3,
    day: 20,
    year: 2019,
    userId: 1
  },
  {
    id: 8,
    title: "Kroger",
    category: "Grocery",
    month: 3,
    day: 10,
    year: 2019,
    userId: 1
  },
  {
    id: 9,
    title: "Louisville Water",
    category: "Water",
    month: 3,
    day: 20,
    year: 2019,
    userId: 1
  },
  {
    id: 10,
    title: "LGE",
    category: "Electricity",
    month: 4,
    day: 20,
    year: 2019,
    userId: 1
  }
];

const users = [{ id: 1, name: "Clayton" }];

const newBudget = {
  id: null,
  title: "",
  category: "",
  month: null,
  day: null,
  year: null,
  userId: null
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newBudget,
  budgets,
  users
};
