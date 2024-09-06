import { useCallback, useEffect, useRef, useState } from "react"

export default function useField(enemyDistance) {
    const [field, setField] = useState([[]])
    const [stockField,setStockField] = useState([[]])//新しく挿入する用の配列
    const [initField,setInitField] = useState([[]])//元の配列(補充用)
    
    const restock = useCallback(() => {//補充する
        if (stockField.length <= 0) {
            setStockField(structuredClone(initField))
        }
    }, [field])

    const getData = async () => {//APIからフィールドを取得
        const res = await fetch("http://localhost:8084/api/field", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        const json = await res.json()

        setInitField(json.field)
        // stockField.current = json.field
        for (let y = 0; y < json.field.length; y++) {
            for (let x = 0; x < json.field[y].length; x++) {
                if (y == 0 && x == 1) {
                    json.field[y][x] = 5
                    console.log("sdfghjk");
                    json.field[y + 2][x] = 4
                }
            }
        }
        setField(json.field)
    }

    useEffect(() => {
        getData()
    }, [])

    return { field, setField, restock, stockField }
}