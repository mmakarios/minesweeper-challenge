import { useState, useEffect, useCallback } from "react";
import ToggleSwitch from "../ToggleSwitch";
import styles from "./Header.module.scss";

interface Props {}

export const Header = (props: Props) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  useEffect(() => {
    if (isDarkTheme) {
      window.document.documentElement.dataset.theme = "theme-dark";
      return;
    }
    window.document.documentElement.dataset.theme = "theme-light";
  }, [isDarkTheme]);

  const onToggleTheme = useCallback(() => {
    setIsDarkTheme(!isDarkTheme);
  }, [isDarkTheme, setIsDarkTheme]);

  return (
    <header className={styles.header}>
      <span>{isDarkTheme ? "🌑" : "☀️"}</span>
      <ToggleSwitch checked={isDarkTheme} onClick={onToggleTheme} />
    </header>
  );
};

export default Header;
