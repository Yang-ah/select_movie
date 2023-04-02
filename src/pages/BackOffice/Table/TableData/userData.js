import React, { useEffect, useState } from "react";

import { getUsers } from "../../../../api/Users";
//import styles from "./tableData.module.scss";

const UsersTableData = ({i, page})=>{

    const [userData, setUserData] = useState({
        id: "string",
        name: "name",
        birth: "birth",
        nickname: "nick name",
        email: "string",
        createdAt: '가입일',
    });

    const responseData = async ()=>{
        const response1 = await getUsers(page,20);
        const createTime = response1.data.data[i].createdAt;
        const day = createTime.slice(0,10);
        setUserData({
            //id : response1.data.data[i].id,
            createdAt: day,
            nickname : response1.data.data[i].nickname,
            email : response1.data.data[i].email,
            name : response1.data.data[i].name,
     
        })
        //console.log(response1.data.data[i]);
    }
    useEffect(()=>{
        responseData();
    },[page]);

return(
<>
    <li> {userData.createdAt} </li>
    <li> {userData.email} </li>
    {/* <li> {userData.nickname} </li> */}
    <li> {userData.name} </li>
</>
)
}

export default UsersTableData