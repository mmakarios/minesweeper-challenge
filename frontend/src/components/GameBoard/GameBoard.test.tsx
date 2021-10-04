import React from "react";
import renderer from "react-test-renderer";
import GameBoard from "./GameBoard";

it("renders component", () => {
  const tree = renderer.create(<GameBoard />).toJSON();

  expect(tree).toMatchSnapshot();
});
