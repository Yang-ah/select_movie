import React, { useState } from "react";
import styles from "./register.module.scss";

const Register = () => {
    const [form, setForm] = useState({
        userName: "",
        userId: "",
        password: "",
        passwordCheck : "",
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
            <h1>회원가입</h1>
            <form
              id="registerForm"
              className={styles.registerForm}
              onSubmit={onSubmit}
            >
              <label className={styles.inputWrapper}>
                <p>닉네임</p>
                <input
                  placeholder="닉네임을 입력해주세요."
                  name="userName"
                  value={form.userName}
                  onChange={onChange}
                />
              </label>
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
              <label className={styles.inputWrapper}>
                <p>비밀번호 확인</p>
                <input
                  type="passworCheck"
                  placeholder="비밀번호를 입력해주세요."
                  name="passwordCheck"
                  value={form.passwordCheck}
                  onChange={onChange}
                />
              </label>
              <button
                className={styles.submitButton}
                type="submit"
                form="loginForm"
              >
                회원가입
              </button>
            </form>
          </section>
        </main>
      );
  };
  
  export default Register;