import useObject from "../useObject"
import "./block.css"
import stump from "../assets/stump.png"
export default function Block({OBJECT_NUM}) {
    const { OBJECT } = useObject()

    return (
        <div className="block">
            {OBJECT_NUM == 0? <img src={stump}/>:""}
        </div>
    )
}