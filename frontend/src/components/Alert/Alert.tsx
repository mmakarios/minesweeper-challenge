import React from "react";
import cx from "classnames";
import styles from "./Alert.module.scss";

interface Props {
  error?: boolean;
}

export const Alert = ({ children, error }: React.PropsWithChildren<Props>) => {
  return (
    <div className={cx(styles.alert, { [styles.error]: error })}>
      {children}
    </div>
  );
};

export default Alert;
