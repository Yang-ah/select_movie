import React, { useState } from 'react';
import styles from './login.module.scss';
import { Button, Input } from '../../../../../components';
import { useNavigate } from 'react-router-dom';
//API
import { adminlogin } from '../../../../../api/Auth';
import { isValidateEmail } from '../../../../../utils';
//recoil
import { useSetRecoilState, useRecoilState } from 'recoil';
import { AdminLoginModalOpen,AdminResistorModalOpen, isLoginAtom } from '../../../../../atom';

import CmsModal from '../../cmsModal';
import { AdminRegisterPage } from '..';

const CMSLogin = () => {
  const navigate = useNavigate();

  //recoil
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const setAdminLoginModalOpen = useSetRecoilState(AdminLoginModalOpen);
  const [adminResistorModalOpen,setResistorModalOpen] = useRecoilState(AdminResistorModalOpen);
 
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });

  const [err, setErr] = useState({
    userId: '',
    password: '',
  });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
    setResistorModalOpen(true);
  };
  const closeModal = () => {
    setResistorModalOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.userId) {
      return setErr({ ...err, userId: '이메일을 입력해주세요' });
    }
    if (!isValidateEmail(form.userId)) {
      return setErr({ ...err, userId: '이메일 양식이 틀립니다' });
    }
    if (!form.password) {
      return setErr({
        ...err,
        userId: '',
        password: '비밀번호를 입력해주세요',
      });
    }

    const { userId, password } = form;

    try {
      //NOTE: 로그인 성공
      //NOTE: 로그인 API 호출
      const response = await adminlogin({
        email: userId,
        password,
      });
      if (response.data) {
        const { accessToken, refreshToken } = response.data;
        //NOTE: 토큰 저장
        localStorage.setItem('ACCESS_TOKEN', accessToken);
        localStorage.setItem('REFRESH_TOKEN', refreshToken);
        //setIsLogin은 recoil state
        setIsLogin(true);
        setAdminLoginModalOpen(false);
        navigate('/backoffice/movies');
      }
    } catch (err) {
      const errData = err.response.data;
        alert(errData.message);
    }
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.login}>
        <h1>관리자 로그인</h1>
        <form id="loginForm" className={styles.loginForm} onSubmit={onSubmit}>
          <Input
            className={styles.inputWrap}
            label="이메일"
            errorText={!!err.userId && err.userId}
            onChange={onChange}
            placeholder="이메일을 입력해주세요."
            name="userId"
            value={form.userId}
          />
          <Input
            className={styles.inputWrap}
            label="비밀번호"
            errorText={!!err.password && err.password}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            value={form.password}
            onChange={onChange}
          />

          <Button className={styles.button} onClick={showModal}>
            관리자 회원가입
          </Button>
          <Button className={styles.button} type="submit" form="loginForm">
            관리자 로그인
          </Button>
        </form>
      </section>
      <CmsModal
        modalOpen1={adminResistorModalOpen}
        setModalOpen={setResistorModalOpen}
        children={<AdminRegisterPage setModalOpen={setResistorModalOpen} />}
      />
    </main>
  );
};

export default CMSLogin;
