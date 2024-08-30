import { useEffect, useState } from "react";

export default function useField(enemyDistance) {
    const [field, setField] = useState([]);
    // console.log(field);
    
    const getData = async () => {
        const res = await fetch(`http://localhost:8084/api/field`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        const json = await res.json();
        const newField =[...json.field];
        for(let i=0;i<newField.length;i++){
            for(let j=0;j<newField[i].length;j++){
                if(i==2&&j==1){
                    //自分
                    newField[i][j]=4
                    newField[i-2][j]=5
                }else if(i==2&&j==0){
                    //切り株
                    newField[i][j]=1
                }else if(i==2&&j==2){
                    //キノコ
                    newField[i][j]=3
                }
            }
        }
        setField(newField);
    }

    useEffect(() => {
        getData()
    }, [])

    return { field, setField }
}