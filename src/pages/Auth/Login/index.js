import React, { useState } from "react";
import styles from "./login.module.scss";
import {Link } from "react-router-dom";
import Input from "../../../components/Common/Input";
//import Button from "../../../components/Common/Button";

import { useNavigate } from "react-router-dom";
import { login } from "../../../api/Auth";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { userId, password } = form;
    //NOTE: 로그인 API 호출
    const response = await login({
      email: userId,
      password,
    });
    //NOTE: 로그인 성공
    if (response.data) {
      const { accessToken, refreshToken } = response.data;
      //NOTE: 토큰 저장
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      localStorage.setItem("REFRESH_TOKEN", refreshToken);

      navigate("/");
    }
  };

  return (
    <main className={styles.wrapper}>
      <section>
        <h1>로그인</h1>
        <form
          id="loginForm"
          className={styles.loginForm}
          onSubmit={onSubmit}
        >
          <Input
          
            className={styles.inputClass}
            label='이메일'
            //errorText='아이디에러시메세지'
            onChange={onChange}
            placeholder="이메일을 입력해주세요."
            name="userId"
            value={form.userId}
            />
            <Input
            className={styles.inputClass}
            label='비밀번호'
            //errorText='아이디에러시메세지'
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            value={form.password}
            onChange={onChange}
            />
          <Link to='/auth/register' style={{ textDecoration: "none" }}>
          <p className={styles.registerLink}>회원가입</p></Link>
            <button
            className={styles.submitButton}
            children={'로그인'}
            type="submit"
            form="loginForm"
            />
        </form>
      </section>
    </main>
  );
};

export default Login;
