import React from "react";
import cx from "classnames";
import styles from "./Alert.module.scss";

interface Props {
  error?: boolean;
  success?: boolean;
  className?: string;
}

export const Alert = ({
  children,
  error,
  success,
  className,
}: React.PropsWithChildren<Props>) => {
  return (
    <div
      className={cx(
        styles.alert,
        className,
        { [styles.error]: error },
        { [styles.success]: success }
      )}
    >
      {children}
    </div>
  );
};

export default Alert;
