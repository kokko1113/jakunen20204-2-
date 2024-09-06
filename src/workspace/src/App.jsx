import { useState } from "react"
import FieldScene from "./component/fieldScene"
import ResultScene from "./component/resultScene"

export default function APP() {
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState(0)
    return (
        <>{!gameOver ? <FieldScene setGameOver={setGameOver} score={score} setScore={setScore}></FieldScene> : <ResultScene score={score}></ResultScene>}</>
    )
}