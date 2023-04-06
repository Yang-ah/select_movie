import styles from './searchInput.module.scss';
import cx from 'classnames';
import { SearchIcon } from '../../../assets/icon';
import Input from '../Input';

// option: iconLocation
const SearchInput = ({
  className,
  option,
  value,
  onChange,
  onClick,
  ...props
}) => {
  return (
    <div className={cx(styles.wrap, className, styles[option])}>
      <Input
        onChange={onChange}
        value={value}
        {...props}
        className={styles.inputWrapper}
      />

      <button type="submit" onClick={onClick} className={cx(styles.button)}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchInput;
