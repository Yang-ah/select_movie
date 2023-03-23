import React, { useCallback, useState } from "react";
import { Dropdown } from "../../components";
import { dropdownItems } from "./dropdownitem";
import styles from "./detail.module.scss";

const Detail = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const onClickDropdown = useCallback((item) => {
    return () => {
      setSelectedItem((prev) => (prev?.id === item.id ? null : item));
    };
  }, []);

  return (
    <section className={styles.wrapper}>
      <div>상세 페이지</div>
    </section>
  );
};

export default Detail;
