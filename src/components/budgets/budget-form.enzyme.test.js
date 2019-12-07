import React from "react";
import BudgetForm from "./budget-form";
import { shallow } from "enzyme";

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
  return shallow(<BudgetForm {...props} />);
};

it("renders form and header", () => {
  const wrapper = renderBudgetForm();
  // console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Budget");
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderBudgetForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save buttons as "Saving..." when saving', () => {
  const wrapper = renderBudgetForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
