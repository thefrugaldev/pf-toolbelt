/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockLineItems = require("./mock-budget");

const { budgets, categories } = mockLineItems;
const data = JSON.stringify({ budgets, categories });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, err => {
  err ? console.error(err) : console.log(`Mock DB created.`);
});
