import React, { useState } from "react";
import styles from "./login.module.scss";
import {Link } from "react-router-dom";
import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
const Login = () => {

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
            //className={styles.inputClass}
            label='이메일'
            //errorText='아이디에러시메세지'
            onChange={onChange}
            placeholder="이메일을 입력해주세요."
            name="userId"
            value={form.userId}
            />
            <Input
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
          <Button
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
