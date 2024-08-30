import "./gameOver.css";
import { postScoreApi,putScoreApi,deleteScoreApi } from "../APIs";
import { useState } from 'react'
export default function GameOver({ score, ranks }) {
    const [postFlag, setPostFlag] = useState(false)
    const [playerId, setPlayerId] = useState(0);

    return (
        <>
            <div className="container">
                <h1 className="heading">GAME OVER</h1>
                <section className="section score">
                    <h2 className="score__heading">今回のスコア</h2>
                    <div className="score__value">{localStorage.getItem("score")}</div>
                    <p className="score__text">ニックネーム求む</p>
                    {!postFlag ? <button className="score__btn" onClick={() => {
                        postScoreApi(score, setPlayerId)
                        setPostFlag(true)
                    }
                    }>スコア投稿</button>
                        :
                        <>
                            <button className="score__btn" onClick={() => putScoreApi(playerId)}>スコア更新</button>
                            <button className="score__btn" onClick={() => deleteScoreApi(playerId)}>スコア削除</button>
                        </>
                    }
                </section>
                <div className="divider"></div>
                <section className="section ranking">
                    <h2 className="ranking__heading">ランキング</h2>
                    {ranks.map(rank => {
                        return (
                            <div className="ranking-row">
                                <div className="ranking__name">{rank.nickname}</div>
                                <div className="ranking__score">{rank.score.toString().padStart(8, '0')}</div>
                            </div>
                        )
                    })}
                </section >
                <div className="divider"></div>
                <a className="replay" href="./">リプレイ</a>
            </div >
        </>
    )
}