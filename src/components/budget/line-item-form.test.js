import React from "react";
import { cleanup, render } from "@testing-library/react";
import LineItemForm from "./line-item-form";

afterEach(cleanup);

const renderLineItemForm = args => {
  const defaultProps = {
    lineITem: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<LineItemForm {...props} />);
};

it("should render form and header", () => {
  const { getByText, container } = renderLineItemForm();

  expect(container.getElementsByTagName("form").length).toEqual(1);
  getByText("Add Budget");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText, debug } = renderLineItemForm();
  //debug();

  getByText("Save");
});

it('should lable save button as "Saving..." when saving', () => {
  const { getByText } = renderLineItemForm({ saving: true });

  getByText("Saving...");
});
