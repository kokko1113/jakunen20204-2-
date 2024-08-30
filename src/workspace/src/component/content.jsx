import './content.css'
import stump from '../assets/stump.png'
import flower from "../assets/flower.png"
import mush from "../assets/mushroom.png"
import player from "../assets/player1.png"
import enemy from "../assets/enemy1.png"

export default function Content({ num,invincible }) {
    return (
        <>
            {num == 0 ? "" : ""}
            {num == 1 ? <img src={stump} alt="" /> : ""}
            {num == 2 ? <img src={flower} alt="" /> : ""}
            {num == 3 ? <img src={mush} alt="" /> : ""}
            {num == 4 ? <img className={invincible? "invincible":""} src={player} alt="" /> : ""}
            {num == 5 ? <img src={enemy} alt="" /> : ""}
        </>
    )
}