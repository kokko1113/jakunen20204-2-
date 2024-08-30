const api = "http://localhost:8084/api"


export const indexApi = async (setRank) => {
    const res = await fetch(`${api}/score`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    const json = await res.json();
    const sortData = json.sort((a, b) => b.score - a.score);
    const sliceData = sortData.slice(0, 3);
    setRank(sliceData);
}

export const postScoreApi = async (score, setPlayerId) => {
    const nickname = window.prompt("ニックネームを入力してください");
    if (nickname) {
        const res = await fetch(`${api}/score`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "nickname": nickname, "score": score })
        })
        const json = await res.json();
        setPlayerId(json.id);
    }
}
export const putScoreApi = async (playerId) => {
    const nickname = window.prompt("ニックネームを入力してください");
    if (nickname) {
        const res = await fetch(`${api}/score/${playerId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "id": playerId, "nickname": nickname })
        })
        const json = await res.json();
    }
}
export const deleteScoreApi = async (playerId) => {
        const warning = window.confirm("本当に削除しますか")
        if(warning){
            const res = await fetch(`${api}/score/${playerId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
                
            const json = await res.json();
        }
}   