import React, { useState } from "react";
import styles from "./register.module.scss";
import Input from "../../../components/Common/Input";
//import Button from "../../../components/Common/Button";

import { useNavigate } from "react-router-dom";
import { register } from "../../../api/Auth";
import { saveTokens, isValidateEmail } from "../../../utils";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: "",
    password: "",
    passwordCheck: "",
    userName: "",
    userBirth: "",
    userNickName: "",
  });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };

  //NOTE: 회원가입 API를 return 해주는 함수
  const onGetRegisterApi = () => {
    return register;
  };
  const onSubmit = async (e) => {
    //NOTE: 새로고침 방지
    e.preventDefault();

    if (!isValidateEmail(form.userId)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    const registerApi = onGetRegisterApi();
    const body = {
      email: form.userId,
      password: form.password,
      name: form.userName,
      birth: form.userBirth,
      nickname: form.userNickName,
    };

    const response = await registerApi(body);
    if (response.status === 200) {
      const data = response.data;
      saveTokens(data);
      navigate("/");
    }
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
            className={styles.inputClass}
            label="이메일"
            //errorText='아이디에러시메세지'
            onChange={onChange}
            placeholder="이메일을 입력해주세요."
            name="userId"
            value={form.userId}
            autoComplete="off"
          />
          <Input
            className={styles.inputClass}
            label="비밀번호"
            //errorText='아이디에러시메세지'
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            value={form.password}
            onChange={onChange}
            autoComplete="off"
          />
          <Input
            className={styles.inputClass}
            label="비밀번호 확인"
            //errorText='아이디에러시메세지'
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            name="passwordCheck"
            value={form.passwordCheck}
            onChange={onChange}
            autoComplete="off"
          />
          <Input
            className={styles.inputClass}
            label="이름"
            //errorText='아이디에러시메세지'
            onChange={onChange}
            placeholder="이름을 입력해주세요."
            name="userName"
            value={form.userName}
          />
          <Input
            className={styles.inputClass}
            label="생일"
            //errorText='아이디에러시메세지'
            onChange={onChange}
            placeholder="생일을 입력해주세요."
            name="userBirth"
            value={form.userBirth}
          />
          <Input
            className={styles.inputClass}
            label="닉네임"
            //errorText='아이디에러시메세지'
            onChange={onChange}
            placeholder="닉네임을 입력해주세요."
            name="userNickName"
            value={form.userNickName}
          />

          <button
            className={styles.submitButton}
            children={"회원가입"}
            type="submit"
            form="registerForm"
          />
        </form>
      </section>
    </main>
  );
};

export default Register;
