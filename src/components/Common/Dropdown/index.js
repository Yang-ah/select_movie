import React, { memo, useEffect, useRef, useState } from 'react';
import { ChevronDown } from '../../../assets/icon';
import styles from './dropdown.module.scss';
import cx from 'classnames';

/** items: [{title:string, value:string},{...}]  */
const Dropdown = ({ className, items, orderBy, setOrderBy }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClickDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  return (
    <div className={cx(styles.wrapper, className)}>
      <div
        ref={ref}
        className={cx(styles.dropdownWrapper, { [styles.isOpen]: isOpen })}
        onClick={onClickDropdown}
      >
        {orderBy.title}
        <ChevronDown className={styles.chevronDown} />
      </div>
      <menu className={cx(styles.itemsWrapper, { [styles.isOpen]: isOpen })}>
        {items.map((item) => {
          return (
            <li
              key={item.title}
              className={styles.item}
              onClick={() => setOrderBy(item)}
            >
              {item.title}
            </li>
          );
        })}
      </menu>
    </div>
  );
};

export default memo(Dropdown);
