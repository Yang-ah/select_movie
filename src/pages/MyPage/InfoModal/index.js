import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./modal.module.scss";
import { Button, Input } from "../../../components";

import { useNavigate } from "react-router-dom"; //
import { register } from "../../../api/Auth"; //
import { saveTokens, isValidateEmail } from "../../../utils"; //
import { TrashIcon } from "../../../assets/icon";
const InfoModal = ({
  modalOpen1,
  setModalOpen,
  children,
  notion,
  content,
  buttonChildren,
  ...props
}) => {
  const modalRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
    };
  });
  //console.log(`컴포넌트 모달오픈${modalOpen1}`)
  //if(modalOpen1===false){return null}

  //input관련.
  const [nickName, setNickName] = useState("");
  const [introduce, setIntroduce] = useState("");

  const onChanges = (e) => {
    setNickName(e.target.value);
    setIntroduce(e.target.value);
  };
  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };
  const onReset = () => {
    setNickName("");
    setIntroduce("");
  };
  const submitText = () => {
    props.propFunction(nickName);
    props.propFunction(introduce);
  };
  //textChangeHandler=onChange  currentTarget=target

  const navigate = useNavigate();
  const [form, setForm] = useState({
    userNickName: "",
  });

  const [err, setErr] = useState({
    userNickName: "",
  });

  const onGetRegisterApi = () => {
    return register;
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.userNickName) {
      return setErr({
        ...err,
        userNickName: "10자 미만",
        userInfo: "100자 미만",
      });
    }

    let body = {
      nickname: form.userNickName,
      info: form.userInfo,
    };

    const registerApi = onGetRegisterApi();
    try {
      const response = await registerApi(body);
      if (response.status === 200) {
        const data = response.data;
        saveTokens(data);
        navigate("/auth/login");
      }
    } catch (err) {
      const errData = err.response.data;
      if (errData.statusCode === 409) {
        alert(errData.message);
      }
    }
  };

  return (
    <CSSTransition
      in={modalOpen1}
      timeout={300}
      classNames={{
        enterActive: styles.modalEnterActive,
        enterDone: styles.modalEnterDone,
        exitActive: styles.modalExit,
        exitDone: styles.modalExitActive,
      }}
      unmountOnExit
    >
      <div className={styles.overlay}>
        <section ref={modalRef} className={styles.container}>
          <header className={styles.title}>
            🤗 당신을 어떻게 소개하고 싶나요? 🤗
          </header>
          <main
            className={styles.content}
            id="registerForm"
            onSubmit={onSubmit}
          >
            <p>닉네임 변경</p>
            <input
              className={styles.nickName}
              label="닉네임"
              errorText={!!err.userNickName && err.userNickName}
              onChange={onChange}
              placeholder="10자 미만"
              name="userNickName"
              value={form.userNickName}
              maxLength={10}
            />
            <p>소개글 변경</p>
            <input
              className={styles.introduce}
              label="소개글"
              errorText={!!err.userInfo && err.userInfo}
              onChange={onChange}
              placeholder="100자 미만"
              name="userInfo"
              value={form.userInfo}
              maxLength={10}
            />
            <button className={styles.deleteUser}>
              <TrashIcon />
              계정을 삭제하시겠습니까?
            </button>
          </main>

          <footer className={styles.buttonBox}>
            <Button className={styles.cancelButton} onClick={closeModal}>
              취소
            </Button>
            <Button className={styles.resetButton} onClick={onReset}>
              초기화
            </Button>
            <Button
              className={styles.submitButton}
              children={""}
              type="submit"
              form="registerForm"
              onClick={submitText}
            >
              {" "}
              완료
            </Button>
          </footer>
        </section>
      </div>
    </CSSTransition>
  );
};

export default InfoModal;
