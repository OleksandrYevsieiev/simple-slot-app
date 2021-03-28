import React from 'react'
import styles from './SlotItem.module.css';

const SlotItem = (props) => {
    const {data, btnText, btnFunc} = props;
    return (
        <div className={styles.container}>
            <span className={styles.data}>{data}</span>
            <button className={styles.startBtn} onClick={btnFunc}>{btnText}</button>
        </div>
    )
}

export default SlotItem;
