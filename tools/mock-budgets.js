const budgets = [
  {
    _id: 1,
    title: "LGE",
    categoryId: 1,
    month: 1,
    day: 20,
    year: 2019
  },
  {
    _id: 2,
    title: "Louisville Water",
    categoryId: 2,
    month: 1,
    day: 1,
    year: 2019
  },
  {
    _id: 3,
    title: "Target",
    categoryId: 5,
    month: 1,
    day: 15,
    year: 2019
  },
  {
    _id: 4,
    title: "LGE",
    categoryId: 1,
    month: 2,
    day: 20,
    year: 2019
  },
  {
    _id: 5,
    title: "Movie Theatre",
    categoryId: 6,
    month: 2,
    day: 12,
    year: 2019
  },
  {
    _id: 6,
    title: "Red Lobster",
    categoryId: 6,
    month: 2,
    day: 17,
    year: 2019
  },
  {
    _id: 7,
    title: "LGE",
    categoryId: 1,
    month: 3,
    day: 20,
    year: 2019
  },
  {
    _id: 8,
    title: "Kroger",
    categoryId: 4,
    month: 3,
    day: 10,
    year: 2019
  },
  {
    _id: 9,
    title: "Louisville Water",
    categoryId: 2,
    month: 3,
    day: 20,
    year: 2019
  },
  {
    _id: 10,
    title: "LGE",
    categoryId: 1,
    month: 4,
    day: 20,
    year: 2019
  }
];

const categories = [
  {
    _id: 1,
    name: "Electricity"
  },
  {
    _id: 2,
    name: "Water"
  },
  {
    _id: 3,
    name: "Mortgage"
  },
  {
    _id: 4,
    name: "Grocery"
  },
  {
    _id: 5,
    name: "Shopping"
  },
  {
    _id: 6,
    name: "Entertainment"
  }
];

const newBudget = {
  _id: null,
  title: "",
  amount: "",
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  year: new Date().getFullYear(),
  categoryId: null,
  savingsAccountId: null,
  description: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newBudget,
  budgets,
  categories
};
