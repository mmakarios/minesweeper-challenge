import React from "react";
import renderer, { act } from "react-test-renderer";
import Menu from "./Menu";

it("renders component", () => {
  const tree = renderer.create(<Menu />);
  const inputs = tree.root.findAllByType("input");
  act(() => {
    inputs.forEach((input) => {
      const event = {
        target: {
          value: 5,
        },
      };
      input.props.onChange(event);
    });
    const button = tree.root.findByType("button");
    button.props.onClick();
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
