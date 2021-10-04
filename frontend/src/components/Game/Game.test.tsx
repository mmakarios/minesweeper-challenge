import React from "react";
import renderer from "react-test-renderer";
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
  const tree = renderer.create(<Game />).toJSON();

  expect(tree).toMatchSnapshot();
});
