import React from "react";
import renderer from "react-test-renderer";
import BoxButton from "./BoxButton";
import { BoxValue, BoxState } from "../../constants";

it("renders component", () => {
  const tree = renderer
    .create(
      <BoxButton box={{ value: BoxValue.Mine, state: BoxState.Unopened }} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
