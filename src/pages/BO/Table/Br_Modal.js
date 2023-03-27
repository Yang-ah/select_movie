import React, { useState} from 'react'
import styles from './br_modal.module.scss'


const Br_Modal =({ selectedData , handleCancel , handleEditSubmit }) =>{
   
    const [edited , setEdited ] =useState(selectedData);

    const onCancel = () =>{
        handleCancel();
    }
    
    const onEditChange = (e) =>{
        setEdited({
        ...edited,
        [e.target.name] : e.target.value
        })
    }
    const onSubmitEdit = (e) =>{
        e.preventDefault();
        handleEditSubmit(edited);
    }


    return(
        <div >
            <div className={styles.br_modal}>
                <div className={styles.br_head}>
                    <h3 className={styles.br_headText}>고객 정보 수정하기</h3>
                </div>
                <form onSubmit={onSubmitEdit}>
                    <div className={styles.br_content}>
                        <div>{edited.name}</div>
                        <div>Name : <input 
                        type='text'
                        name='name'
                        value={edited.name}
                        onChange={onEditChange}/>
                        </div>
                        <div>Email : <input 
                        type='text'
                        name='email'
                        value={edited.email}
                        onChange={onEditChange}/></div>
                        <div>Phone : <input 
                        type='text'
                        name='phone'
                        value={edited.phone}
                        onChange={onEditChange}/></div>
                        <div>Website : <input 
                        type='text'
                        name='website'
                        value={edited.website}
                        onChange={onEditChange}/></div>
                        <div className={styles.br_buttonBox}>
                            <button className={styles.br_cancelButton} onClick={onCancel}>취소</button>
                            <button className={styles.br_deleteButton} type='submit'>수정</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
    )
    
}

export default Br_Modal;