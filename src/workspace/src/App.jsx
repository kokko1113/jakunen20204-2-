import { useState } from "react"
import FieldScene from "./component/fieldScene"
import ResultScene from "./component/resultScene"

export default function APP() {
    const [gameOver, setGameOver] = useState(false)

    return (
        <>{!gameOver ? <FieldScene></FieldScene> : <ResultScene></ResultScene>}</>
    )
}