import React from "react";
import cx from "classnames";

import styles from "./toggle.module.scss";

const Toggle = ({ className, ...props }) => {
  return (
    <label className={cx(styles.wrapper, className)}>
      <input type="checkbox" hidden readOnly {...props} />
      <span role="button" className={styles.button} />
    </label>
  );
};

export default Toggle;
