import React from "react";
import renderer, { act } from "react-test-renderer";
import Header from "./Header";

it("renders component", () => {
  const tree = renderer.create(<Header />);
  const label = tree.root.findByType("label");
  act(() => {
    label.props.onClick();
    tree.update(<></>);
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
