import React , {useState} from 'react'
import MealTimeCard from './MealTimeCard'

const MealChooseCard = () =>{
    const [checkedItems , setCheckedItems] = useState([])
    const datas = [
        {title : '아침식사' , time : '오전 7:00 ~ 9:00'},
        {title : '아침간식' , time : '오전 7:00 ~ 9:00'},
        {title : '점심식사' , time : '오전 11:30 ~ 오후 1:00'},
        {title : '점심간식' , time : '오전 11:30 ~ 오후 1:00'},
        {title : '저녁식사' , time : '오후 5:30 ~ 7:00'},
        {title : '저녁간식' , time : '오후 5:30 ~ 7:00'},
    ]

    const checkedItemHandler = (code , isChecked) =>{
        if(isChecked){
            setCheckedItems([...checkedItems, code])
        } else if (!isChecked && checkedItems.find(one => one === code)){

        const filter = checkedItems.filter(one => one !== code)
        setCheckedItems([...filter])
        }
    }

    const onCheckAll = (checked) =>{
        if(checked) {
            const checkedItemsArray = []
            datas.forEach(data =>   checkedItemsArray.push(data.title))
            setCheckedItems(checkedItemsArray)
        }else {
            setCheckedItems([])
        }
    }

    return (
        <>
        <label onClick={onCheckAll}>
            <input type='checkbox'
                name='meal'
                onChane={(e) => onCheckAll(e.target.checked)}
                className='hidden'/>
                <img src='./checkbox-11.svg' />
                <img src={checkedItems.length === datas.length ? `./checkbox-active.svg` 
                : `./checkbox-11.svg`}/>
                    <h2>모두선택</h2>
        </label>            
        <div>
            {datas.map(data => <MealTimeCard date={data.title}
            checkedItems={checkedItems} checkedItemHandler={checkedItemHandler} />)}
        </div>
        </>
    )
}

export default MealChooseCard;