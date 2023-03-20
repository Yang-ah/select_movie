import React, { useState } from "react";

import styles from "./home.module.scss";

import { Button, CheckBox, Input, Star } from "../../components";

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isError, setIsError] = useState(false);

  const onClickPrimaryButton = () => {
    setIsError(!isError);
  };

  const onChangeToggle = (e) => {
    const { checked } = e.currentTarget;
    setIsChecked(checked);
  };

  return (
    <section className={styles.wrapper}>
      <div>순위</div>
      <div>카테고리</div>

      <Button onClick={onClickPrimaryButton}>button로고색</Button>
        <Button color="secondary">button2번색</Button>
        <h2>Input</h2>
        <Input label="label" />
        <Input label="label" errorText={isError && "errorText"} />
        <h2>CheckBox</h2>
        <CheckBox />
        <Star/>
    </section>
  );
};

export default Home;