---
to: <%= absPath %>/<%= component_name %>.tsx
---
import styles from "./<%= component_name %>.module.scss";

interface Props {};

export const <%= component_name %> = (props: Props) => {
  return <div className={styles.<%= component_name %>}></div>;
};

export default <%= component_name %>;
