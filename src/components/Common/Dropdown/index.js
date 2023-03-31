import React, { memo, useEffect, useRef, useState } from "react";
import cx from "classnames";
import { ChevronDown } from "../../../assets/icon";
import styles from "./dropdown.module.scss";

// items: string[]
const Dropdown = ({ className, items, value, onClick }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const onClickDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  return (
    <div className={cx(styles.wrapper, className)}>
      <div
        ref={ref}
        className={cx(styles.dropdownWrapper, { [styles.isOpen]: isOpen })}
        onClick={onClickDropdown}
      >
        {value ?? "정렬"}
        <ChevronDown className={styles.chevronDown} />
      </div>
      <menu className={cx(styles.itemsWrapper, { [styles.isOpen]: isOpen })}>
        {items.map((item) => {
          return (
            <li
              key={item}
              className={styles.item}
              onClick={() => onClick(item)}
            >
              {item}
            </li>
          );
        })}
      </menu>
    </div>
  );
};

export default memo(Dropdown);