import React, { useEffect, useState } from "react";
import styles from "./register.module.scss";
import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";

import { useNavigate } from "react-router-dom";
import { register } from "../../../api/Auth";
import { saveTokens, isValidateEmail } from "../../../utils";
import Slider from "react-slick";
import { getMoviesTop } from "../../../api/Movies";

const settings={
  centerMode: true,
  centerPadding: "0px",
  dot: false,
  arrow: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToScroll: 1,
  slidesToShow: 1, //몇개씩 보여줌?,
}

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

  const [err, setErr] = useState({
    userId: '',
    password: '',
    passwordCheck : '',
    userName: '',
    userBirth: '',
    userNickName: '',
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
    //NOTE: 입력창 오류 확인
    if(!form.userId){
      return setErr({...err,userId:'이메일을 입력해주세요'})}
    if (!isValidateEmail(form.userId)) {
      return setErr({...err,userId:'이메일 양식이 틀립니다'})}
    if(!form.password){ 
      return setErr({...err,userId:'', password:'비밀번호를 입력해주세요'})}
    if(form.password !== form.passwordCheck){
      return setErr({...err,password:'', passwordCheck:'비밀번호가 다릅니다'})}
    if(!form.userName){
      return setErr({...err,passwordCheck:'', userName:'이름을 입력해주세요'})}
    if(!form.userBirth){
      return setErr({...err,userName:'', userBirth:'생년월일을 입력해주세요'})}
    if(form.userBirth.length !== 6 ){
      return setErr({...err, userBirth:'6자리로 입력해주세요'})}
    if(!form.userNickName){
      return setErr({...err,userBirth:'', userNickName:'닉네임을 입력해주세요'})}
    
    let body = {
      email : form.userId,
      password : form.password,
      name : form.userName,
      birth : form.userBirth,
      nickname : form.userNickName,
    };

    const registerApi = onGetRegisterApi();
    try{
      const response = await registerApi(body);
      if (response.status === 200) {
        const data = response.data;
        saveTokens(data);
        navigate("/auth/login");
      }
    } catch(err) { //서버에서 주는 에러 메세지 띄우기 
      const errData = err.response.data;
      if (errData.statusCode === 409){
        alert(errData.message);
      }
    }
  };
  
  const [movies,setMovies] = useState();

  const showMoviesTop = async () => {
    const response = await getMoviesTop();
    setMovies(response.data.data);
  };
  
  useEffect(() => {
    showMoviesTop();
  }, []);

  return (
    <main className={styles.wrapper}>
      {/* <section className={styles.movies}>
      <Slider {...settings}>
      {!!movies&& movies.map((movie, index)=>{
        return(
          <div ><img className={styles.moviePoster} src={movies[index].postImage}/></div>
        );  
      })}
      </Slider >
      </section> */}
      <section className={styles.register}>
        <h1>회원가입</h1>
        <form
          id="registerForm"
          className={styles.registerForm}
          onSubmit={onSubmit}
        >
          <Input
          className={styles.inputClass}
          label='이메일'
          errorText={!!err.userId && err.userId}
          onChange={onChange}
          placeholder="이메일을 입력해주세요."
          name="userId"
          value={form.userId}
          autoComplete="off"
          />
          <Input
          className={styles.inputClass}
          label='비밀번호'
          errorText={!!err.password && err.password}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          name="password"
          value={form.password}
          onChange={onChange}
          autoComplete="off"
          />
          <Input
          className={styles.inputClass}
          label='비밀번호 확인'
          errorText={!!err.passwordCheck && err.passwordCheck}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          name="passwordCheck"
          value={form.passwordCheck}
          onChange={onChange}
          autoComplete="off"
          />
          <Input
          className={styles.inputClass}
          label='이름'
          errorText={!!err.userName && err.userName}
          onChange={onChange}
          placeholder="이름을 입력해주세요."
          name="userName"
          value={form.userName}
          />
          <Input
          className={styles.inputClass}
          label='생일'
          errorText={!!err.userBirth && err.userBirth}
          onChange={onChange}
          placeholder="YYMMDD"
          name="userBirth"
          value={form.userBirth}
          />
          <Input
          className={styles.inputClass}
          label='닉네임'
          errorText={!!err.userNickName && err.userNickName}
          onChange={onChange}
          placeholder="닉네임을 입력해주세요."
          name="userNickName"
          value={form.userNickName}
          />

          <Button
            className={styles.button}
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
