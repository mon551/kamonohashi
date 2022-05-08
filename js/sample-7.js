// トランプの配列を作る
// カードが未使用だったら false  使用済みだったらtrue 
let cards = new Array(5);
for(let i=0; i<5; i++) {
    cards[i] = new Array(13);

    // カードの初期値を代入
    for(let j=0; j<13; j++) {
        // 0行目はジョーカーの配列
        if(i!==0 || (i===0 && j<2) ){
            cards[i][j] = false;
        } else {
            cards[i][j] = true;
        }
    }
}

// 記号の配列 記号のカードがすべて使用されたらtrueになる
// 0:ジョーカー 1:ハート 2:スペード 3:ダイヤ 4:クローバー
let arraySuit = new Array(5);
for(let i=0; i<5; i++){
    arraySuit[i] = false;
}
// 今回ジョーカーは使わない
arraySuit[0] = true;

// 手札の配列
let comHand    = new Array(5);
let playerHand = new Array(5);

// カードの獲得枚数
let playerCardEarnNum = 0;
let comCardEarnNum    = 0;
let cardPending       = 0;

// 最初は画面を隠しておく
const game = document.querySelectorAll("#screen *");
game.forEach(el => {
    el.classList.add("is-hidden");
});

window.onload = () =>{
    // 説明画面
    const descriptionScreen = document.createElement("div");
    descriptionScreen.id = "description-screen";

    // 説明表題
    const title = document.createElement("p");
    title.innerHTML = "--ルール説明--";
    title.classList.add("description-title");

    // ルール説明
    const rule = document.createElement("p");
    rule.innerHTML = "<span>二人で遊ぶトランプゲーム</span><br>"+
                        "カードを出し合いカードの数の大小を比べて、"+
                        "より大きい数字を出したほうがカードを獲得できる<br>"+
                        "最終的に獲得したカード数が多いほうが勝ち<br>"+
                        "(ジョーカーは除く)";
    rule.classList.add("description-rule");

    // イメージ画像表示
    const sampleImg = document.createElement("img");
    sampleImg.src = "../img/sample-7.svg";
    sampleImg.classList.add("sample-img");

    // ゲームを始めるボタン
    const button = document.createElement("p");
    button.classList.add("game-start-button");
    button.innerHTML = "ゲームを始める";
    // クリックするとゲームスタート
    button.onclick = () => {
        // ルール説明を消す
        screen.removeChild(descriptionScreen);
        
        // ロード画面を表示し、ゲームをスタートする
        loading(1500)
        .then(() => {
            // ゲーム画面を表示する
            return new Promise(resolve => {
                const gameScreen = document.querySelectorAll("#screen *");
                gameScreen.forEach(el => {
                    el.classList.remove("is-hidden");
                });
                resolve();
            })
        })
        .then(gameStart());
    }

    // 要素を追加する
    descriptionScreen.appendChild(title);
    descriptionScreen.appendChild(rule);
    descriptionScreen.appendChild(sampleImg);
    descriptionScreen.appendChild(button);

    // スクリーンに説明を表示する
    const screen = document.querySelector("#screen");
    screen.appendChild(descriptionScreen);
}

function gameStart() {
    // ---comの初期設定---
    // comの初期手札を生成
    for(let i=0; i<5; i++){

        // 画像の番号を二次元配列で取得
        comHand[i] = getCardArrayIndex();

        // comの手札を置く場所を取得
        const comArea = document.querySelector("#com-area");
        
        // divタグ生成
        const newDiv = document.createElement("div");
        newDiv.classList.add("com-hand");

        const newImg = document.createElement("img");
        newImg.src = "../img/cards/card-back.png";

        // comの手札を表示
        newDiv.appendChild(newImg);
        comArea.appendChild(newDiv);
    }
    // comの獲得枚数を表示する場所を生成
    const comEarnNumElement = document.createElement("p");
    comEarnNumElement.classList.add("com-earn-num");
    comEarnNumElement.innerHTML = `${comCardEarnNum}`;

    // 獲得枚数を表示
    const comPlayArea = document.querySelector(".play-com-card");
    comPlayArea.appendChild(comEarnNumElement);

    // ---プレイヤーの初期設定---
    // プレイヤーの初期手札を生成
    for(let i=0; i<5; i++){

        // 表示する画像の番号を二次元配列で取得
        playerHand[i] = getCardArrayIndex();

        // プレイヤーの手札を置く場所を取得 
        const playerArea = document.querySelector("#player-area");

        // divタグ生成
        const newDiv = document.createElement("div");
        newDiv.classList.add("player-hand");
        
        // 手札のカード配列と表示する場所を渡す
        addImgToDivElement(playerHand[i], newDiv);
       
        // img要素を持ったdivタグを手札に追加する
        playerArea.appendChild(newDiv);
    }
    // プレイヤーの獲得枚数を表示する場所を生成
    const playerEarnNumElement = document.createElement("p");
    playerEarnNumElement.classList.add("player-earn-num");
    playerEarnNumElement.innerHTML = `${playerCardEarnNum}`;

    // 獲得枚数を表示
    const playerPlayArea = document.querySelector(".play-player-card");
    playerPlayArea.appendChild(playerEarnNumElement);

    // プレイヤーの手札を取得し、クリックイベントを付与する
    const hand = document.querySelectorAll(".player-hand");
    hand.forEach(el => {
        el.addEventListener('click', function(){playCard(el); }, false )
    });
}

// カードを出す
function playCard(playerPlayCard) {

    // カード出し場にある要素を取得
    const child = document.querySelector(".win-or-lose-text");
    const PCard = document.querySelectorAll(".play-player-card *");
    const CCard = document.querySelectorAll(".play-com-card *");
    // 消去
    if(child !== null) child.remove();
    PCard.forEach(el => {
        if(el.className !== "player-earn-num") el.remove();
    });
    CCard.forEach(el => {
        if(el.className !== "com-earn-num") el.remove();
    });

    // カードを出す(戻り値は出したカードの数字)
    const numPlayer = playPlayer(playerPlayCard);
    const numCom    = playCom();

    // 結果を表示
    const result = () => {
        showWinOrLose(numPlayer, numCom)
        .then(showResult())
    };
    result();
}

function playPlayer(playerPlayCard) {
    // プレイヤーのカードを出す場所を取得
    const playArea = document.querySelector(".play-player-card");

    // 出すカードの手札のインデックスを取得
    const nodeList = document.querySelectorAll(".player-hand");
    const index = playCardHandIndex(nodeList, playerPlayCard);

    // 出したカードの数字の入った要素を作成
    const cardNumElement = document.createElement("p");
    cardNumElement.innerHTML = `${playerHand[index][1]}`
    cardNumElement.classList.add("card-number");

    // カードを出す
    playArea.appendChild(playerPlayCard.firstChild);
    // カードの数字を表示
    playArea.appendChild(cardNumElement);
    
    // 手札を更新
    tmpPlayedNum = playerHand[index][1];
    playerHand[index] = getCardArrayIndex();
    addImgToDivElement(playerHand[index], playerPlayCard);
    
    // 出したカードの数値を返す
    return tmpPlayedNum;
}

function playCom() {
    // カードを出す場所を取得
    const playArea = document.querySelector(".play-com-card");

    // 出すカードの手札のインデックスを取得
    let index
    do{
        index = Math.floor(Math.random() * 5);
    } 
    while(comHand[index][1]  === 0);

    // 出したカードの数字の入った要素を作成
    const cardNumElement = document.createElement("p");
    cardNumElement.innerHTML = `${comHand[index][1]}`
    cardNumElement.classList.add("card-number", "number-com");

    // カードを出す
    addImgToDivElement(comHand[index], playArea);
    // カードの数字を表示
    playArea.appendChild(cardNumElement);

    // 手札を更新
    tmpPlayedNum = comHand[index][1];
    comHand[index] = getCardArrayIndex();

    // 山札が切れたら、手札に追加しない
    if(comHand[index][1] === 0){
        // endクラスを追加し、非表示にする
        const hand = document.querySelectorAll(".com-hand");
        hand[index].classList.add("end");
        // imgを消す
        hand[index].firstChild.remove();
    }
    
    // カードの数値を返す
    return tmpPlayedNum;
}

function showWinOrLose(player, com){

    return new Promise(resolve => {
         // 手札のイベントを無効化する
        const hand = document.querySelectorAll(".player-hand");
        hand.forEach(el => {
            el.classList.add("event-none");
        });

        // 1秒後に勝敗結果を表示
        setTimeout(() => {
            // 出すカードを表示するエリア
            const cardArea = document.querySelector("#card-area");
            
            
            if(player  !== com){
                // 勝った分のカードを獲得する
                playerCardEarnNum += (player > com ? 2+cardPending : 0);
                comCardEarnNum    += (player < com ? 2+cardPending : 0);
                // 保留カードを0にする
                cardPending = 0;

                // 勝敗を表示する
                const newElement = document.createElement("p");
                newElement.innerHTML = `${(player > com ? "WIN":"LOSE")}` ;               
                newElement.classList.add("win-or-lose-text");
                cardArea.appendChild(newElement);

                // 現在の獲得カード枚数を表示する
                const playerEarnArea     = document.querySelector(".player-earn-num");
                playerEarnArea.innerHTML = `${playerCardEarnNum}`;
                const comEarnNum     = document.querySelector(".com-earn-num");
                comEarnNum.innerHTML = `${comCardEarnNum}`
            }
            else {
                // カードを保留する
                cardPending += 2;

                // 引き分けテキストを表示する
                const newElement = document.createElement("p");
                newElement.innerHTML = "DRAW";
                newElement.classList.add("win-or-lose-text");
                cardArea.appendChild(newElement);
            }
            
            // 手札のイベントを復活させる
            hand.forEach(el => {
                el.classList.remove("event-none");
            });
            resolve();
        }, 800);
    });
}

function showResult() {
    // 手札を使い切ったか判定
    if(playerHand.every(val => val[1] === 0) ){
        setTimeout(() => {
            // ゲーム画面を取得
            const screen = document.querySelector("#screen");
            // result画面を表示する要素
            const result = document.createElement("div");
            result.classList.add("result-screen");

            // リザルト画面の表題要素
            const resultTitle = document.createElement("p");
            resultTitle.classList.add("result-title");
            resultTitle.innerHTML = "結果発表！";

            // リザルトコメントの要素
            const resultText = document.createElement("p");
            resultText.classList.add("result-text");
            resultText.innerHTML = "獲得枚数";

            // プレイヤー結果を表示する要素
            const resultPlayer = document.createElement("p");
            resultPlayer.classList.add("result-earn-number");
            resultPlayer.innerHTML = `<span class="player">　あなた　　</span>：${playerCardEarnNum}枚`;

            // コンピュータ結果を表示する要素
            const resultCom = document.createElement("p");
            resultCom.classList.add("result-earn-number");
            resultCom.innerHTML = `<span class="com">コンピュータ</span>：${comCardEarnNum}枚`;

            // 勝敗結果を表示する要素
            const winOrLoseText = document.createElement("p");
            winOrLoseText.classList.add("result-win-or-lose");
            winOrLoseText.innerHTML = `あなたの<br>${(playerCardEarnNum > comCardEarnNum? "勝ちです:)" : "負けです:(")}`;

            // もう一度遊ぶ
            const playAgain = document.createElement("p");
            playAgain.classList.add("page-transition");
            playAgain.innerHTML = "もう一度遊ぶ";
            playAgain.onclick = () => document.location.reload() ;

            // ホームへ戻る
            const backToHome = document.createElement("p");
            backToHome.classList.add("page-transition");
            backToHome.innerHTML = "HOMEに戻る";
            backToHome.onclick = () => document.location.href = "https://mon551.github.io/kamonohashi/";

            // 生成した要素をresultに入れる
            result.appendChild(resultTitle);
            result.appendChild(resultText);
            result.appendChild(resultPlayer);
            result.appendChild(resultCom);
            result.appendChild(winOrLoseText);
            result.appendChild(playAgain);
            result.appendChild(backToHome);

            // 結果を画面に表示する
            screen.appendChild(result);
        }, 1000)
    }
}

function getCardArrayIndex() {
    let suit, num;

    // カードが残っているか判定
    if( arraySuit.some(val => val === false) ){
        // 記号を確定する
        do {
            suit = Math.floor(Math.random() * 4 + 1);
        }
        while(arraySuit[suit] == true);

        // 数字を確定する
        do {
            num = Math.floor(Math.random() * 13 + 1);
        }
        while(cards[suit][num-1] == true);

        // 使用済カードはtureにする
        cards[suit][num-1] = true;

        // それぞれの記号のカードをすべて使いきったか調べる
        // 使い切ったら arraySuit に tureを代入
        for(let i=0; i<arraySuit.length; i++){
            if(arraySuit[i] !== true){
                arraySuit[i] = cards[i].every(function(val){
                    return val === true;
                });
            }
        }
    }
    else {
        suit = 0;
        num  = 0;
    }

    return [suit, num];
}

function addImgToDivElement(cardArray, div) {
    
    const newImg = document.createElement("img");

    // cardArray[1]はカード数字が入る
    // カード数字が0ということはカードが無い
    if( cardArray[1] !== 0){
        newImg.src = `../img/cards/${cardArray[0]}-${cardArray[1]}.png`;
        div.appendChild(newImg);
    }
    else {
        div.classList.add("end");
    }
    
    
}

function playCardHandIndex(nodeList, target) {
    return Array.prototype.indexOf.call(nodeList, target);
}

function loading(time){
    return new Promise(resolve => {
        
        // ロードアニメーションを追加
        const waveform = document.createElement("div");
        waveform.classList.add("waveform");

        for(let i=0; i<4; i++){
            const bar = document.createElement("div");
            bar.classList.add("waveform__bar");
            waveform.appendChild(bar);
        }

        const screen = document.querySelector("#screen");
        screen.appendChild(waveform);

        // 指定秒待つ
        setTimeout(() =>{
            // ローディングを消す
            waveform.remove();
            resolve();
        }, time);
    });
}

