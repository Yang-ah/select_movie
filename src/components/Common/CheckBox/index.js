import React from "react";
import cx from "classnames";
import { SolidSquareCheckIcon } from "../../../assets/icon";
import styles from "./checkBox.module.scss";

const CheckBox = ({ className, ...props }) => {
  return (
    <label className={cx(styles.wrapper, className)}>
      <input type="checkbox" readOnly hidden {...props} />
      <SolidSquareCheckIcon />
    </label>
  );
};

export default CheckBox;
