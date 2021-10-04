import React from "react";
import renderer from "react-test-renderer";
import Button from "./Button";

it("renders component", () => {
  const tree = renderer.create(<Button />).toJSON();

  expect(tree).toMatchSnapshot();
});
