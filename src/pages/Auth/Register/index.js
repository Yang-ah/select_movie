import React, { useState } from "react";
import styles from "./register.module.scss";
import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
const Register = () => {
    const [form, setForm] = useState({
        userId: "",
        password: "",
        passwordCheck : "",
        userName: "",
        userBirth: "",
        userNickName: "",
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
            <Input
            label='비밀번호 확인'
            //errorText='아이디에러시메세지'
            type="passworCheck"
            placeholder="비밀번호를 입력해주세요."
            name="passwordCheck"
            value={form.passwordCheck}
            onChange={onChange}
            />
            <Input
            label='name'
            //errorText='아이디에러시메세지'
            onChange={onChange}
            placeholder="이름을 입력해주세요."
            name="userName"
            value={form.userName}
            />
            <Input
            label='birth'
            //errorText='아이디에러시메세지'
            onChange={onChange}
            placeholder="생일을 입력해주세요."
            name="userBirth"
            value={form.userBirth}
            />
            <Input
            label='nickname'
            //errorText='아이디에러시메세지'
            onChange={onChange}
            placeholder="닉네임을 입력해주세요."
            name="userNickName"
            value={form.userNickName}
            />
            
            <Button
            className={styles.submitButton}
            children={'회원가입'}
            type="submit"
            form="loginForm"
            />
            </form>
          </section>
        </main>
      );
  };
  
  export default Register;