import React from "react";
import styles from "./Slider.module.scss";

type Props = React.HTMLProps<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> & {};

export const Slider = ({ ...rest }: Props) => {
  return <input type="range" {...rest} />;
};

export default Slider;
