import { getRankingApi, postScoreApi, deleteScoreApi, putScoreApi } from "../APIs"
import "./resultScene.css"
import { useState } from "react"

export default function ResultScene({ score }) {
    const [rankings, setRankings] = useState([])
    const [playerId, setPlayerId] = useState(0)
    const [postFlag, setPostFlag] = useState(false)
    const [message, setMessage] = useState("")

    getRankingApi(setRankings)

    return (
        <div className="container">
            <h1 className="heading">GAME OVER</h1>
            <section className="section score">
                <h2 className="score__heading">今回のスコア</h2>
                <div className="score__value">{score.toString().padStart(8, '0')}</div>
                <div className="maessage">{message}</div>
                <p className="score__text">ニックネーム求む</p>
                {!postFlag ?
                    <button className="score__btn" onClick={() => {
                        postScoreApi(score, setPlayerId, setMessage, setPostFlag)
                    }}>スコア投稿</button>
                    :
                    <>
                        <button className="score__btn" onClick={() => putScoreApi(playerId, setMessage)}>スコア更新</button>
                        <button className="score__btn" onClick={() => deleteScoreApi(playerId, setMessage)}>スコア削除</button>
                    </>
                }
            </section>
            <div className="divider"></div>
            <section className="section ranking">
                <h2 className="ranking__heading">ランキング</h2>
                {
                    rankings.map(rank => {
                        return (
                            <div className="ranking-row">
                                <div className="ranking__name">{rank.nickname}</div>
                                <div className="ranking__score">{rank.score.toString().padStart('8', 0)}</div>
                            </div>
                        )
                    })
                }
            </section>
            <div className="divider"></div>
            <a className="replay" href="./">リプレイ</a>
        </div>
    )
}