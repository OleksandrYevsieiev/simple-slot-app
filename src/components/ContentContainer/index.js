import React, { useState, useEffect } from 'react';
import styles from './ContentContainer.module.css';
import SlotItem from './../SlotItem'
import Header from './../Header';
import { useStickyState, makeSortedTable } from './../../utils';


const ContentContainer = () => {

    const [firstSlotData, setFirstSlotData] = useState(1);
    const [secondSlotData, setSecondSlotData] = useState(2);
    const [thirdSlotData, setThirdSlotData] = useState(3);
    const [balance, setBalance] = useStickyState(10, 'balance');
    const [spinStats, setSpinStats] = useState([]);

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };
    
    const startGame = () => {
        const gamePopUp = document.getElementById("gamePopUp");
        gamePopUp.style.visibility='visible';
    };

    const endGame = () => {
        const gamePopUp = document.getElementById("gamePopUp");
        gamePopUp.style.visibility='hidden';
    };

    const logStats = () => {
        const newSpinTime = new Date().toString();
        const newSpinStats = {firstSlotData, secondSlotData, thirdSlotData, newSpinTime};
        setSpinStats([...spinStats, newSpinStats]);
    };

    const debugSlots = () => {
        setFirstSlotData(7);
        setSecondSlotData(7);
        setThirdSlotData(7);
        logStats();
    };

    const spinSlots = () => {
        if(balance > 0.5) {
            setBalance(balance - 1);
            setFirstSlotData(getRandomInt(10));
            setSecondSlotData(getRandomInt(10));
            setThirdSlotData(getRandomInt(10));
            logStats();
        } else {
            console.error('Please refill your balance.')
        }
    };

    useEffect(()=>{
        if(firstSlotData === 7 & secondSlotData === 7 & thirdSlotData === 7){
                setBalance(balance + 10.00);
            } else if(firstSlotData === secondSlotData || secondSlotData === thirdSlotData){
                setBalance(balance + 0.5);
            } else if(firstSlotData === secondSlotData & secondSlotData === thirdSlotData){
                setBalance(balance + 5);
            }
    }, [firstSlotData, secondSlotData, thirdSlotData, spinStats]);

    makeSortedTable();

    return (
        <>
        <Header balance={balance} />
        <div className={styles.contentContainer}>
            <button type='submit' className={styles.startBtn} onClick={startGame}>Start game</button>
            <div className={styles.slotsContainer} id='gamePopUp'>
                <SlotItem data={firstSlotData} btnText={'Spin 2 win!'} btnFunc={spinSlots}/>
                <SlotItem data={secondSlotData} btnText={'Debug slot'} btnFunc={debugSlots}/>
                <SlotItem data={thirdSlotData} btnText={'End game'} btnFunc={endGame}/>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Slot 1</td>
                        <td>Slot 2</td>
                        <td>Slot 3</td>
                        <td>Time</td>
                    </tr>
                </thead>
                <tbody>
                    {spinStats.map((spin, i) => {
                        return (
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{spin.firstSlotData}</td>
                                <td>{spin.secondSlotData}</td>
                                <td>{spin.thirdSlotData}</td>
                                <td>{spin.newSpinTime}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default ContentContainer;
