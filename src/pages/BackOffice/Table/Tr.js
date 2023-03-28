import React from "react";
import MealChooseCard from "./MealChooseCard";
import Td from "./Td"
import styles from './tr.module.scss'


    
const Tr = ({info, handleRemove , handleEdit}) =>{
    return(
        <tbody>
            {
                info.map(item =>{
                    return (
                        <>
                        <div className={styles.tableBody}><Td key={item.id} item={item} handleRemove={handleRemove}
                        handleEdit={handleEdit} />
                        </div>
                        </>
                 )
                })
            }
        </tbody>
    )
}

export default Tr;