import React , {useEffect, useState, useRef} from "react"
import axios from 'axios'
import Tr from './Tr'
import Br_Modal from './Br_Modal'
import styles from './board.module.scss'


const Board = ({bh_1,bh_2,bh_3,bh_4,bh_5,bh_6,bh_7}) =>{

    const [info , setInfo] = useState([]);
    const [selected , setSelected] = useState('');
    const [modalOn , setModalOn] = useState(false);

    const nextId = useRef(11);

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => setInfo(res.data))
        .catch(err => console.log(err));
    }, []);


    const handleSave = (data) =>{

        if(data.id) {
            setInfo(
                info.map(row => data.id === row.id ? {
                    id : data.id,
                    name : data.name,
                    email : data.email,
                    phone : data.phone,
                    website : data.website,
                } : row))
        } else {
            setInfo(info => info.concat(
                {
                    id : nextId.current,
                    name : data.name,
                    email : data.email,
                    phone : data.phone,
                    website : data.website                    
                }
            ))
            nextId.current += 1;
        }
    }

    const handleRemove = (id) =>{
        setInfo(info => info.filter(item => item.id !== id))
    }

    const handleEdit = (item) =>{
        setModalOn(true);
        const selectedData = {
            id : item.id,
            name : item.name,
            email : item.email,
            phone : item.phone,
            website : item.website
        };
        console.log(selectedData);
        setSelected(selectedData);
    };

    const handleCancel = () =>{
        setModalOn(false)
    }

    const handleEditSubmit = (item) => {
        console.log(item);
        handleSave(item);
        setModalOn(false);
    }

    return(
        <div className={styles.br_container}>
            <div></div>
            <table className={styles.br_body}>
                <thead className={styles.br_head}>
                    <tr>
                        <th>{bh_1}</th>
                        <th>{bh_2}</th>
                        <th>{bh_3}</th>
                        <th>{bh_4}</th>
                        <th>{bh_5}</th>
                        <th>{bh_6}</th>
                        <th>{bh_7}</th>
                    </tr>
                </thead>
            <Tr className={styles.tr_content} info={info} handleRemove={handleRemove} handleEdit={handleEdit} />
            {modalOn && <Br_Modal selectedData={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit} />}
            </table>

        </div>
    )

}

export default Board;

/*          <Post onSaveDate={handleSave} />
{modalOn && <Modal selectedData={selected} handleCancel={handleCancel}
handleEditSubmit={handleEditSubmit} />}*/