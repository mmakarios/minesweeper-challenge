import cx from "classnames";
import styles from "./Button.module.scss";

type Props = React.HTMLProps<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
  };

const Button = ({ className, children, ...rest }: Props) => {
  return (
    <button className={cx(styles.button, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
