import"./resultScene.css"
import { useState } from "react"

export default function ResultScene() {
    const [rankings, setRankings] = useState([])

    return (
        <div className="container">
            <h1 className="heading">GAME OVER</h1>
            <section className="section score">
                <h2 className="score__heading">今回のスコア</h2>
                <div className="score__value">00012340</div>
                <div className="maessage">MESSAGE</div>
                <p className="score__text">ニックネーム求む</p>
                <button className="score__btn">スコア投稿</button>
            </section>
            <div className="divider"></div>
            <section className="section ranking">
                <h2 className="ranking__heading">ランキング</h2>
                <div className="ranking-row">
                    <div className="ranking__name">Player1's Name</div>
                    <div className="ranking__score">00012340</div>
                </div>
                <div className="ranking-row">
                    <div className="ranking__name">Player2's Name</div>
                    <div className="ranking__score">00012340</div>
                </div>
                <div className="ranking-row">
                    <div className="ranking__name">Player3's Name</div>
                    <div className="ranking__score">00012340</div>
                </div>
            </section>
            <div className="divider"></div>
            <a className="replay" href="./">リプレイ</a>
        </div>
    )
}