import styles from "./ToggleSwitch.module.scss";

type Props = React.HTMLProps<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    onClick(): void;
  };

export const ToggleSwitch = ({ onClick, ...rest }: Props) => {
  return (
    <div className={styles.toggleSwitch}>
      <input type="checkbox" {...rest} />
      <label onClick={onClick} />
    </div>
  );
};

export default ToggleSwitch;
