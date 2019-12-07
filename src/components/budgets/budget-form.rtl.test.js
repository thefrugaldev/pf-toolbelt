import React from "react";
import { cleanup, render } from "@testing-library/react";
import BudgetForm from "./budget-form";

afterEach(cleanup);

const renderBudgetForm = args => {
  const defaultProps = {
    users: [],
    budget: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<BudgetForm {...props} />);
};

it("should render Add Budget header", () => {
  const { getByText } = renderBudgetForm();
  getByText("Add Budget");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText, debug } = renderBudgetForm();
  //debug();
  getByText("Save");
});

it('should lable save button as "Saving..." when saving', () => {
  const { getByText } = renderBudgetForm({ saving: true });
  getByText("Saving...");
});
