import React from "react";
import { act, create } from "react-test-renderer";
import GameBoard from "./GameBoard";
import { BoardContext } from "../Game";

it("renders component", () => {
  const tree = create(
    <BoardContext.Provider
      value={{
        board: {
          id: "id",
          status: 0,
          boxes: [
            [
              { value: "", state: "opened" },
              { value: "", state: "unopened" },
            ],
            [
              { value: "1", state: "opened" },
              { value: "m", state: "unopened" },
            ],
          ],
          started_at: "2021-03-10 07:38:12",
        },
      }}
    >
      <GameBoard />
    </BoardContext.Provider>
  );
  const buttons = tree.root.findAllByType("button");
  act(() => {
    buttons.forEach((button) => {
      button.props.onClick();
    });
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
