import React, { useEffect, useState } from "react";

const MealTimeCard = ({data , checkedItems, checkedItemHandler}) =>{
    const [isChecked , setIsChecked] = useState(null)

    const onCheck = ({target}) =>{
        checkedItemHandler(target.value , target.checked)
        setIsChecked(target.checked)
    }
    
    useEffect(()=> {
        if(checkedItems.includes(data)){
            setIsChecked(true)
        }else{
            setIsChecked(false)
        }
    }, checkedItems)

    return(
        <>
            <label key={data}>
                <input type='checkbox'
                    name='meal'
                    checked={isChecked}
                    value={data}
                    onChange={e => onCheck(e)}
                    className='hidden' />
                    <span>{data}</span>
            </label>
        </>
    )
}

export default MealTimeCard;