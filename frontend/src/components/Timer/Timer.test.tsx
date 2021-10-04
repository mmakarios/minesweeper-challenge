import React from "react";
import renderer from "react-test-renderer";
import Timer from "./Timer";

it("renders component", () => {
  const tree = renderer.create(<Timer startDate="" />).toJSON();

  expect(tree).toMatchSnapshot();
});
