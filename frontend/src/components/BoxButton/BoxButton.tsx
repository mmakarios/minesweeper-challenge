import { Box } from "../../types";
import styles from "./BoxButton.module.scss";
import cx from "classnames";

type Props = React.HTMLProps<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    box: Box;
    className?: string;
  };

const ColorConvert: { [key: string]: string } = {
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
};

export const BoxButton = ({ box, ...rest }: Props) => {
  return (
    <button
      className={cx(
        styles.boxbutton,
        styles[box.state],
        styles[ColorConvert[box.value]]
      )}
      {...rest}
    >
      {box.state === "opened" && box.value !== "m" && box.value}
      {box.value === "m" && "💣"}
      {box.state === "flagged" && "🚩"}
    </button>
  );
};

export default BoxButton;
