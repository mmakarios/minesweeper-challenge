import React from "react";
import { act, create } from "react-test-renderer";
import Game from "./Game";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    environment: "dev",
    service: "fakeService",
    id: "1",
  }),
}));

it("renders component", () => {
  const tree = create(<Game />);
  const buttons = tree.root.findAllByType("button");
  act(() => {
    buttons.forEach((button) => {
      button.props.onClick();
    });
    tree.update(<></>);
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
