import React, { useState } from "react";
import styles from "./login.module.scss";

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
          <label className={styles.inputWrapper}>
            <p>아이디</p>
            <input
              placeholder="아이디를 입력해주세요."
              name="userId"
              value={form.userId}
              onChange={onChange}
            />
          </label>
          <label className={styles.inputWrapper}>
            <p>비밀번호</p>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              name="password"
              value={form.password}
              onChange={onChange}
            />
          </label>
          <button
            className={styles.submitButton}
            type="submit"
            form="loginForm"
          >
            로그인
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
