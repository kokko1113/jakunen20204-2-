import useObject from "../useObject"
import "./block.css"
import stump from "../assets/stump.png"
import flower from "../assets/flower.png"
import mush from "../assets/mushroom.png"
import player from "../assets/player1.png"
import enemy from "../assets/enemy1.png"
export default function Block({ OBJECT_NUM, invincible }) {
    const { OBJECT } = useObject()

    return (
        <div className="block">
            {OBJECT_NUM == OBJECT.empty ? "" : ""}
            {OBJECT_NUM == OBJECT.stump ? <img src={stump} /> : ""}
            {OBJECT_NUM == OBJECT.flower ? <img src={flower} /> : ""}
            {OBJECT_NUM == OBJECT.mush ? <img src={mush} /> : ""}
            {OBJECT_NUM == OBJECT.player ? <img src={player} className={invincible ? "invincible" : ""} /> : ""}
            {OBJECT_NUM == OBJECT.enemy ? <img src={enemy} /> : ""}
        </div>
    )
}