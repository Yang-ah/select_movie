import React, { memo } from "react";
import { CheckIcon } from "../../../assets/icon";
import styles from "./checkBox.module.scss";

const CheckBox = ({ ...props }) => {
  return (
    <label className={styles.wrapper}>
      <input type="checkbox" readOnly hidden {...props} />
      <CheckIcon />
    </label>
  );
};

export default memo(CheckBox);

