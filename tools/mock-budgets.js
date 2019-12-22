const budgets = [
  {
    id: 1,
    title: "LGE",
    category: 1,
    month: 1,
    day: 20,
    year: 2019,
    userId: 1
  },
  {
    id: 2,
    title: "Louisville Water",
    category: 2,
    month: 1,
    day: 1,
    year: 2019,
    userId: 1
  },
  {
    id: 3,
    title: "Target",
    category: 5,
    month: 1,
    day: 15,
    year: 2019,
    userId: 1
  },
  {
    id: 4,
    title: "LGE",
    category: 1,
    month: 2,
    day: 20,
    year: 2019,
    userId: 1
  },
  {
    id: 5,
    title: "Movie Theatre",
    category: 6,
    month: 2,
    day: 12,
    year: 2019,
    userId: 1
  },
  {
    id: 6,
    title: "Red Lobster",
    category: null,
    month: 2,
    day: 17,
    year: 2019,
    userId: 1
  },
  {
    id: 7,
    title: "LGE",
    category: 1,
    month: 3,
    day: 20,
    year: 2019,
    userId: 1
  },
  {
    id: 8,
    title: "Kroger",
    category: 4,
    month: 3,
    day: 10,
    year: 2019,
    userId: 1
  },
  {
    id: 9,
    title: "Louisville Water",
    category: 2,
    month: 3,
    day: 20,
    year: 2019,
    userId: 1
  },
  {
    id: 10,
    title: "LGE",
    category: 1,
    month: 4,
    day: 20,
    year: 2019,
    userId: 1
  }
];

const users = [{ id: 1, name: "Clayton" }];

const categories = [
  {
    id: 1,
    name: "Electricity"
  },
  {
    id: 2,
    name: "Water"
  },
  {
    id: 3,
    name: "Mortgage"
  },
  {
    id: 4,
    name: "Grocery"
  },
  {
    id: 5,
    name: "Shopping"
  },
  {
    id: 6,
    name: "Entertainment"
  }
];

const newBudget = {
  id: null,
  title: "",
  category: null,
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  year: new Date().getFullYear(),
  userId: null
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newBudget,
  budgets,
  users,
  categories
};
