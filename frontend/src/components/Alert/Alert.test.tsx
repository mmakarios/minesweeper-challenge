import React from "react";
import renderer from "react-test-renderer";
import Alert from "./Alert";

it("renders component", () => {
  const tree = renderer.create(<Alert />).toJSON();

  expect(tree).toMatchSnapshot();
});
