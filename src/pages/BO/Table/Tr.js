import React from "react";
import Td from "./Td"
import styles from './tr.module.scss'


    
const Tr = ({info, handleRemove , handleEdit}) =>{
    return(
        <tbody className={styles.tr_content}>
            {
                info.map(item =>{
                    return (
                        <Td key={item.id} item={item} handleRemove={handleRemove}
                        handleEdit={handleEdit} />
                    )
                })
            }
        </tbody>
    )
}

export default Tr;