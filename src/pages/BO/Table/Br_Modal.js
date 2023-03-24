import React, { useState } from 'react'

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
        <div>
            <div>
                <div>
                    <h3>고객 정보 수정하기</h3>
                    <h3 onClick={onCancel}>cancel</h3>
                </div>
                <form onSubmit={onSubmitEdit}>
                    <div>
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
                        <div>
                            <button onClick={onCancel}>취소</button>
                            <button type='submit'>수정</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
    )
    
}

export default Br_Modal;