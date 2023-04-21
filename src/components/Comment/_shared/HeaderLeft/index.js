import { ShareIcon, UserIcon } from '../../../../assets/icon';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../../../state';
import { useNavigate } from 'react-router-dom';
import styles from './headerLeft.module.scss';
import cx from 'classnames';

/** type : review, reviewInput, comment, preview */
const HeaderLeft = ({ className, type, userName, date, writtenId }) => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);

  const onClick = () => {
    if (type === 'preview') {
      return;
    }
    if (type === 'reviewInput' && !isLogin) {
      return navigate('/auth/login');
    }
    if (type === 'reviewInput' && isLogin) {
      return navigate('/my');
    }
    navigate(`/user/${writtenId}`);
  };

  return (
    <article
      className={cx(styles.left, styles[type], className)}
      onClick={onClick}
    >
      {type === 'comment' && <ShareIcon className={styles.IShare} />}

      <p className={styles.profileIcon}>
        <UserIcon className={styles.userIcon} />
      </p>
      <div className={styles.profileText}>
        <h2 className={styles.userName}>{userName}</h2>
        <p className={styles.date}>{date}</p>
      </div>
    </article>
  );
};
export default HeaderLeft;
