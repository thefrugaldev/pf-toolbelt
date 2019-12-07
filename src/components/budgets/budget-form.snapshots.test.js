import React from "react";
import BudgetForm from "./budget-form";
import renderer from "react-test-renderer";
import { budgets, users } from "../../../tools/mock-budgets";

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <BudgetForm
      budget={budgets[0]}
      users={users}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Save' when saving is false", () => {
  const tree = renderer.create(
    <BudgetForm
      budget={budgets[0]}
      users={users}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});
