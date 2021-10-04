import React from "react";
import renderer from "react-test-renderer";
import ToggleSwitch from "./ToggleSwitch";

it("renders component", () => {
  const tree = renderer.create(<ToggleSwitch onClick={() => {}} />).toJSON();

  expect(tree).toMatchSnapshot();
});
