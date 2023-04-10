import React, { useEffect, useState } from 'react';
import styles from './login.module.scss';
import { Link, useLocation } from 'react-router-dom';
import Input from '../../../components/Common/Input';
//import Button from "../../../components/Common/Button";

import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/Auth';
import { isValidateEmail } from '../../../utils';

import { useSetRecoilState } from 'recoil';
import { isLoginAtom } from '../../../atom';
import { Button } from '../../../components';

const Login = () => {
  const navigate = useNavigate();
  const locations = useLocation();

  const setIsLogin = useSetRecoilState(isLoginAtom);

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

  const onClick = (path) => {
    navigate(`/${path}`);
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
      const response = await login({
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
        //NOTE: location의 state를 이용해서 분기처리
        if (locations.state.prev === 'register') {
          navigate('/');
        } else {
          navigate(-1); //동작을 안함...
        }
      }
    } catch (err) {
      const errData = err.response.data;
        alert(errData.message);
    }
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.login}>
        <h1>로그인</h1>
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
          <Button className={styles.button} type="submit" form="loginForm">
            로그인
          </Button>
          <Button
            className={styles.button}
            type="button"
            onClick={() => onClick('backoffice/admin')}
          >
            관리자 로그인 페이지로 이동
          </Button>
          <Button
            className={styles.button}
            type="button"
            onClick={() => onClick('auth/register')}
          >
            회원가입 페이지로 이동
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Login;
