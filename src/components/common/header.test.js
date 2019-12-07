import React from "react";
import Header from "./header";
import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

it("contains 4 anchors via mount", () => {
  const headerContainer = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).container;

  const numAnchors = headerContainer.getElementsByTagName("a").length;

  expect(numAnchors).toEqual(4);
});
