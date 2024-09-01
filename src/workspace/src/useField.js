import { useCallback, useEffect, useRef, useState } from "react"
import useObject from "./useObject"

export default function useField() {
    const [field, setField] = useState([[]])
    const stockField = useRef([[]])//新しく挿入する用の配列
    const initField = useRef([[]])//元の配列(補充用)
    const { OBJECT } = useObject()

    const restock = useCallback(() => {//補充する
        if (stockField.current.length <= 0) {
            stockField.current = structuredClone(initField)
        }
    }, [])

    const moveField = useCallback(() => {//フィールドが動く
        setField(prevField => {
            const newField = structuredClone(prevField)
            restock()
            newField.shift()
            newField.pop() = stockField.current.shift()
            return newField
        })
    }, [stockField, restock])

    const getData = async () => {//APIからフィールドを取得
        const res = await fetch("http://localhost:8084/api/field", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        const json = await res.json()
        initField.current = json.field
        const newField = [...json.field]
        for (let y = 0; y < newField.length; y++) {
            for (let x = 0; x < newField[y].length; x++) {
                if (y == 0 && x == 1) {
                    newField[y][x] == OBJECT.enemy
                    newField[y + 2][x] == OBJECT.player
                }
            }
        }
        console.log(newField);
        setField(newField)
        console.log(field);
    }

    useEffect(() => {
        getData()
    }, [])

    return { field, }
}