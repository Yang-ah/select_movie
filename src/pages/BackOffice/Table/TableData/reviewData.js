import React, { useEffect, useState } from "react";
import { getReviews } from "../../../../api/Reviews";

//import styles from "./tableData.module.scss";

const ReviewsTableData = ({i, path})=>{

    const [userData, setUserData] = useState({
        id: "리뷰id",
        createdAt: "작성일",
        userName: '유저이름',
        //영화 API에 DATA 없음
        content: '작성내용',

    });

    const responseData = async ()=>{
        const response1 = await getReviews(1,20);
        const createTime = response1.data.data[i].createdAt;
        const day = createTime.slice(0,10);
        setUserData({
            //id : response1.data.data[i].id,
            createdAt: day,
            userName : response1.data.data[i].user.name,
            content : response1.data.data[i].content,
     
        })
        console.log(response1.data);
    }
    useEffect(()=>{
        responseData();
    },[]);

return(
<>
    <li> {userData.createdAt} </li>
    <li> {userData.userName} </li>
    <li> {userData.content} </li>
</>
)
}

export default ReviewsTableData