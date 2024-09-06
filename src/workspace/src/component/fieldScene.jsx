import { useCallback, useEffect, useRef, useState } from "react"
import "./fieldScene.css"
import useObject from "../useObject"
import useField from "../useField"
import Block from "./block"
import rock from "../assets/rock.png"

export default function FieldScene({ setGameOver, score, setScore }) {
    const { OBJECT } = useObject()
    const [invincible, setInvincible] = useState(false)
    const [enemyDistance, setEnemyDistance] = useState(2)
    const { field, setField, restock, stockField } = useField(enemyDistance)
    const [playing, setPlaying] = useState(false)
    const [itemData, setItemData] = useState("")
    const [time,setTime] = useState(1000)
    const [count,setCount] = useState(0)

    const handleKeyDown = (e) => {
        switch (e.code) {
            case "ArrowLeft":
                moveLeft()
                break;
            case "ArrowRight":
                moveRight()
        }
    }

    const moveLeft = useCallback(() => {
        setField(prevField => {
            const newField = structuredClone(prevField)
            console.log(enemyDistance);

            for (let y = 0; y < newField.length; y++) {
                for (let x = 1; x < newField[y].length; x++) {
                    if (newField[y][x] == OBJECT.player) {
                        getItem(newField[y][x - 1])
                        newField[y][x] = OBJECT.empty
                        newField[y - enemyDistance][x] = OBJECT.empty
                        newField[y][x - 1] = OBJECT.player
                        newField[y - enemyDistance][x - 1] = OBJECT.enemy
                    }
                }
            }
            return newField
        })
    }, [enemyDistance])

    const moveRight = useCallback(() => {
        setField(prevField => {
            const newField = structuredClone(prevField)
            console.log(enemyDistance);
            
            for (let y = 0; y < newField.length; y++) {
                for (let x = newField[y].length - 2; x >= 0; x--) {
                    if (newField[y][x] == OBJECT.player) {
                        getItem(newField[y][x + 1])
                        newField[y][x] = OBJECT.empty
                        newField[y - enemyDistance][x] = OBJECT.empty
                        newField[y][x + 1] = OBJECT.player
                        newField[y - enemyDistance][x + 1] = OBJECT.enemy
                    }
                }
            }
            return newField
        })
    }, [enemyDistance])

    const moveField = useCallback(() => {//フィールドが動く
        setField(prevField => {
            const newField = structuredClone(prevField)
            console.log(enemyDistance);
            
            for (let y = newField.length - 1; y >= 0; y--) {
                for (let x = 0; x < newField[y].length; x++) {
                    if (newField[y][x] == OBJECT.player) {
                        getItem(newField[y + 1][x])
                        newField[y][x] = OBJECT.empty
                        newField[y + 1][x] = OBJECT.player
                        newField[y - enemyDistance][x] = OBJECT.empty
                        newField[y - enemyDistance + 1][x] = OBJECT.enemy
                    }
                }
            }
            restock()
            newField.shift()
            // const row = stockField.shift()
            // if (row != undefined) {
            //     newField.push(row)
            // }
            return newField
        })
    }, [stockField, restock,enemyDistance])

    const getItem = (distination) => {
        setScore(prevScore => prevScore + 10)
        if (distination == OBJECT.stump) {
            setItemData(prevData => prevData = "stump")
        } else if (distination == OBJECT.flower) {
            setItemData(prevData => prevData = "flower")
        } else if (distination == OBJECT.mush) {
            setItemData(prevData => prevData = "mush")
        }
    }

    const gameStart = (e) => {
        if (e.key == " ") {
            setPlaying(prevPlaying => !prevPlaying)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', gameStart)
        return () => {
            window.removeEventListener('keydown', gameStart)
        }
    }, [])

    useEffect(() => {
        if (itemData == "stump") {
            if (invincible) {
                setInvincible(false);
            } else {
                setEnemyDistance(prev => prev - 1);
            }
        } else if (itemData == "flower") {
            setScore(prev => prev + 100)
        } else if (itemData == "mush") {
            if (!invincible) { setInvincible(true) }
        }
    }, [itemData]);


    useEffect(() => {
        if (playing) {
            const intarval = setInterval(() => {
                moveField()
                setCount(prev => prev + 1)
            }, time);
            return () => {
                clearInterval(intarval)
            }
        }
    }, [playing,time])

    useEffect(()=>{
        if(count%5 == 0 && count != 0){
            setTime(prev => prev - 100)
        }
    },[count])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [field,count])

    useEffect(() => {
        console.log(enemyDistance);
        
        if (enemyDistance <= 0) {
            setPlaying(false)
            setGameOver(true)
            setTime(1000)
            setCount(0)
            localStorage.setItem("score", score.toString().padStart(8, '0'))
        }
        const newField = [...field];
        for (let y = 0; y < newField.length; y++) {
            for (let x = 0; x < newField[y].length; x++) {
                if (newField[y][x] == OBJECT.player) {
                    newField[y - enemyDistance - 1][x] = OBJECT.empty
                    newField[y - enemyDistance][x] = OBJECT.enemy
                    setField(newField)
                }
            }
        }
    }, [enemyDistance])

    return (
        <main>
            <h1 className="score">{score.toString().padStart(8, '0')}</h1>
            <div className="field">{
                field.map(row => {
                    return <div className="row">
                        <div className="box"><img src={rock} alt="" /></div>
                        {row.map(box => {
                            return <div className={`box ${invincible && box == OBJECT.player ? invincible : ""}`}><Block OBJECT_NUM={box} invincible={invincible}></Block></div>
                        })}
                        <div className="box"><img src={rock} alt="" /></div>
                    </div>
                })
            }</div>
        </main>
    )
}