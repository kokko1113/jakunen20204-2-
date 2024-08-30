import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Content from './component/content'
import rock from './assets/rock.png'
import useField from './useField'
import GameOver from './component/gameOver'
import { indexApi, postScoreApi } from './APIs'

function App() {
  const [score, setScore] = useState(0);
  const [invincible, setInvincibale] = useState(false)//無敵状態
  const [enemyDistance, setEnemyDistance] = useState(2)//敵との距離
  const { field, setField } = useField(enemyDistance);
  const [finishFlag, setFinishFlag] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [ranks, setRanks] = useState([]);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(1000);
  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {//一定時間でmoveFieldを実行
        moveField()
      }, time);
      return () => {
        clearInterval(interval)
      }
    }
  }, [playing])

  useEffect(() => {
    window.addEventListener('keydown', gameStart)
    return () => {
      window.removeEventListener('keydown', gameStart)
    }
  }, [playing]);

  useEffect(() => {
    if (count % 5 == 0 && count != 0) {//五段ごとに早くなる
      setTime(prev => prev - 100)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [field, count]);

  // スコアを8桁でゼロパディング
  const formattedScore = score.toString().padStart(8, '0');

  useEffect(() => {//終了したら
    setPlaying(false);
    setTime(1000);
    setCount(0);
    localStorage.setItem("score", formattedScore);
  }, [finishFlag])

  useEffect(() => {//切り株にぶつかったとき
    if (enemyDistance == 0) { setFinishFlag(true) }//終了
    else {
      //敵が近づく処理
      // const newField = [...field];
      // for (let y = 0; y < newField.length; y++) {
      //   for (let x = 0; x < newField[y].length; x++) {
      //     if (newField[y][x] == 4) {
      //       newField[y - enemyDistance][x] = 5
      //       newField[y - enemyDistance - 1][x] = 0
      //       setField(newField)
      //     }
      //   }
      // }
    }
  }, [enemyDistance])

  const handleKeyDown = (e) => {
    switch (e.code) {
      case "ArrowLeft":
        moveleft()
        break;
      case "ArrowRight":
        moveright()
        break;
    }
  }

  const gameStart = (e) => {
    if (e.key == " ") {
      setPlaying(prev => !prev)
    }
  }

  const moveleft = () => {//左に動く
    setField(prevField => {
      const newField = [...prevField].map(row => [...row])
      for (let y = 0; y < newField.length; y++) {
        for (let x = 1; x < newField[y].length; x++) {
          if (newField[y][x] == 4) {
            getItems(newField[y][x - 1])//移動先に何があるかを渡す
            newField[y][x - 1] = 4
            newField[y][x] = 0
            newField[y - enemyDistance][x - 1] = 5
            newField[y - enemyDistance][x] = 0
          }
        }
      }
      return [...newField]
    })
  }
  const moveright = () => {//右に動く
    setField(prevField => {
      const newField = [...prevField].map(row => [...row])
      for (let y = 0; y < newField.length; y++) {
        for (let x = newField[y].length - 2; x >= 0; x--) {
          if (newField[y][x] == 4) {
            getItems(newField[y][x + 1])
            newField[y][x + 1] = 4
            newField[y][x] = 0
            newField[y - enemyDistance][x + 1] = 5
            newField[y - enemyDistance][x] = 0
          }
        }
      }
      return [...newField]
    })
  }

  const getItems = (destination) => {//アイテムを取得したときの処理
    setScore(prevScore => prevScore + 10)
    console.log(enemyDistance);
    
    if (destination == 1) {//切り株
      if (invincible) {
        setInvincibale(false)
      } else {
        setEnemyDistance(prevDistance => prevDistance - 1)
      }
    } else if (destination == 2) {//花
      setScore(prevScore => prevScore + 100)
    } else if (destination == 3) {//キノコ
      if (!invincible) {
        setInvincibale(true)
      }
    }
  }

  const moveField = () => {//フィールドが移動する
    setField(prevField => {
      const newField = [...prevField]

      for (let y = newField.length - 1; y >= 0; y--) {
        for (let x = 0; x < newField[y].length; x++) {
          if (newField[y][x] == 4) {
            getItems(newField[y + 1][x])
            newField[y][x] = 0
            newField[y + 1][x] = 4
            newField[y - enemyDistance][x] = 0
            newField[y + 1 - enemyDistance][x] = 5
          }
        }
      }
      //フィールドをループ
      newField[newField.length - 1] = newField.shift()
      setCount(prev => prev + 1);
      return newField
    })
  }
  //ランキングスコア取得
  indexApi(setRanks)


  return (
    <main>
      {!finishFlag ?
        <>
          <h2 className='score'>{formattedScore}</h2>
          <div className="field">
            {field.map((row, y) => {
              return <div className='row'>
                <div className="box"><img src={rock} alt="aaaa" /></div>
                {row.map((box, x) => {
                  return <div className='box'>
                    <Content num={box} invincible={invincible}></Content></div>
                })}
                <div className="box"><img src={rock} alt="aaa" /></div>
              </div>
            })}
          </div>
        </>
        :
        <GameOver formattedScore={formattedScore} score={score} ranks={ranks}></GameOver>}
    </main>
  )
}

export default App
