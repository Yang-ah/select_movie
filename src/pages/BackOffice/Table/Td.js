import React from "react"
import styles from './td.module.scss'

const Td = ({item , handleRemove , handleEdit}) => {
    const onRemove = () =>{
        handleRemove(item.id)
    }

    const onEdit = () =>{
        handleEdit(item);
    }

    return(
        <>
        <tr className={styles.tdbody}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.website}</td>
            <td onClick={onEdit}>Edit</td>
            <td onClick={onRemove}>Remove</td>
        </tr>

        </>
    )

}

export default Td;