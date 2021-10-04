import React from "react";
import renderer from "react-test-renderer";
import Slider from "./Slider";

it("renders component", () => {
  const tree = renderer.create(<Slider />).toJSON();

  expect(tree).toMatchSnapshot();
});
