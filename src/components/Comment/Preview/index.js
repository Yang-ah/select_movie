import { HeaderLeft, HeaderRightRating } from '../_shared';
import styles from './preview.module.scss';
import cx from 'classnames';

const Preview = ({ comment, userName, date, rating, className }) => {
  return (
    
    <section className={cx(styles.wrap, className)}>
      <header>
        <HeaderLeft type="preview" userName={userName} date={date} />
        <HeaderRightRating rating={rating} />
      </header>

      <main>{comment}</main>
    </section>
    
  );
};

export default Preview;
