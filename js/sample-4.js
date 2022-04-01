// 手番を設定   1:〇 -1:✕
let turn = 1;
// テーブルを取得する
let table = document.querySelectorAll(".cell");
let field = Array(9);
let winFlg = true;
// 順番を取得する
let firstSecond = document.querySelectorAll(".order");
const game = document.getElementById("table");
let display = document.getElementById("display");
const reload = document.querySelector("#reload");

// 勝ち条件
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// ゲームスタート
function gameStart(value) {
    // 先攻後攻を隠す
    firstSecond.forEach(function (firstSecond) {
        firstSecond.classList.add("is-hidden");
    });
    game.classList.remove("is-hidden");
    display.innerHTML = "<p>ゲームスタート</p>";

    // comが先攻なら先にcomを動かす
    if(value === 1) com();
        
    player();
    
}

// クリックされた時の処理
function player() {

    for(let i=0; i<field.length; i++){
        
        table[i].onclick = () =>{
            // 〇×がないか判定
            if(field[i] === undefined && winFlg === true){

                const newImg = getImgSrc(turn);

                // 画像を表示する
                table[i].appendChild(newImg);

                // 置かれた場所にマークする
                field[i] = turn;

                // 手番を変更する
                turn = (turn===1 ? -1 : 1);
                
                // 終了したか確認
                isFinished();

                // コンピュータの応手
                if(winFlg){
                    com();
                    // 終了したか確認
                    isFinished();
                } 
            }
        }
    }
}

// コンピュータの応手
async function com() {
    // コンピュータ手番表示
    display.innerHTML = "<p>コンピュータの番です</p>";
    game.classList.add("event-none");

    // 0~9のランダム生成
    let random = Math.floor(Math.random() * field.length);
    
    while(field[random] !== undefined){
        random = Math.floor(Math.random() * field.length);
    }

    // 表示する画像を取得
    const newImg = getImgSrc(turn);
    
    // 一時停止
    //await sleep(1500);

    // 画像を表示する
    table[random].appendChild(newImg);

    // 置かれた場所にマークする
    field[random] = turn;

    // 手番を変更する
    turn = (turn===1 ? -1 : 1);

    // プレイヤー手番表示(ここに置くのは違和感)
    display.innerHTML = "<p>プレイヤーの番です</p>";
    game.classList.remove("event-none");
}

//終了したか判定
function isFinished() {
    let winner = 0;

    // 〇か✕が揃ったか検索
    for(let i=0; i<winPatterns.length; i++){
        // 勝ち条件の並びを代入
        let order = winPatterns[i];
        
        // 勝者がいるか検索
        winner = 0;
        for(let j=0; j<3 && field[order[j] ] !== undefined; j++){
            winner += field[order[j] ]
        }

        // 勝者を決定する
        if(winner === -3 || winner === 3){
            winner = (winner===3 ? 1 : -1);
            winFlg = false;
            displayResult(winner);
            break;
        }
    }

    // 引き分けか調べる
    let i;
    for(i=0; i<field.length && field[i] !== undefined; i++);
    if(i === field.length && winFlg === true){
        winFlg = false;
        displayResult(0);
    }
}

// 結果を表示
function displayResult(winner) {
    let result
    // テーブルのイベントを無効化する
    game.classList.add("event-none");
    reload.classList.remove("is-hidden");

    // リザルトコメントを代入する
    if(winner === 0){
        result = "引き分けです。";
    } else {
        const win = (winner===1 ? "〇" : "✕");
        result = `<p>${win}が勝ちました。</p>`;
    }
    
    // 結果を表示する
    display.innerHTML = result;
}

// リロード(もう一度遊ぶ)
reload.onclick = () => { document.location.reload() };

// 表示する画像を取得
function getImgSrc(turn){

    // imgタグを新しく作る
    const newImg = document.createElement("img");

    // 手番に応じた画像を読み込む
    if(turn === 1){
        newImg.src = "../img/sample-4_circle.jpg";
    } else {
        newImg.src = "../img/sample-4_cross.jpg";
    }
    // 画像サイズを整える(px)
    newImg.width = 100;
    newImg.height = 100;

    return newImg;
}