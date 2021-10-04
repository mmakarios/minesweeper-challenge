import React from "react";
import renderer from "react-test-renderer";
import Menu from "./Menu";

it("renders component", () => {
  const tree = renderer.create(<Menu />).toJSON();

  expect(tree).toMatchSnapshot();
});
