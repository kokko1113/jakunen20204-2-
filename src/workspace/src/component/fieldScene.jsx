import { useState } from "react"
import useObject from "../useObject"
import useField from "../useField"
import Block from "./block"
import rock from "../assets/rock.png"

export default function FieldScene() {
    const { OBJECT } = useObject()
    const { field } = useField()

    return (
        <div className="field">{
            field.map(row => {
                return <div className="row">
                    <div className="box"><img src={rock} alt="" /></div>
                    {row.map(box => {
                        return <div className="box"><Block></Block></div>
                    })}
                    <div className="box"><img src={rock} alt="" /></div>
                </div>
            })
        }</div>
    )
}