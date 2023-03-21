import React from "react";
import cx from "classnames";
import styles from "./button.module.scss";

const Button = ({ className, children, option, ...props }) => {
  return (
    <button
      className={cx(styles.button, className, styles[option])}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
