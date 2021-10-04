import React from "react";
import renderer from "react-test-renderer";
import Timer from "./Timer";

it("renders component", () => {
  const tree = renderer.create(
    <Timer startDate="2021-03-10 07:30:12" endDate="2021-03-10 07:38:12" />
  );
  tree.update(<></>);
  expect(tree.toJSON()).toMatchSnapshot();
});

it("renders component without and end date", () => {
  const tree = renderer.create(<Timer startDate="2021-03-10 07:30:12" />);
  tree.update(<></>);
  expect(tree.toJSON()).toMatchSnapshot();
});
