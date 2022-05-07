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

window.onload = () => {
    
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
        addImgToDivTag(playerHand[i], newDiv);
       
        // img要素を持ったdivタグを手札に追加する
        playerArea.appendChild(newDiv);
    }

    // プレイヤーの手札を取得し、クリックイベントを付与する
    const NodeList = document.querySelectorAll(".player-hand");
    NodeList.forEach(el => {
        el.addEventListener('click', function(){playCard(el); }, false )
    });
}

// カードを出す
function playCard(cardDivTag /*or cardLoc*/ ) {

    // カード出し場にある要素を消去
    const child = document.querySelector(".win-or-loss-text");
    const PCard = document.querySelector(".play-player-card");
    const CCard = document.querySelector(".play-com-card");

    if(child !== null) child.remove();
    while(PCard.firstChild){
        PCard.removeChild(PCard.firstChild);
    }
    while(CCard.firstChild){
        CCard.removeChild(CCard.firstChild);
    }

    // カードを出す(戻り値は出したカードの数字)
    const numPlayer = playPlayer(cardDivTag);
    const numCom    = playCom();

    // 結果を表示
    const result = () => {
        showWinOrLoss(numPlayer, numCom)
        .then(showResult())
    };
    result();
}

function playPlayer(cardDivTag) {
    // プレイヤーのカードを出す場所を取得
    const playArea = document.querySelector(".play-player-card");

    // 出すカードの手札のインデックスを取得
    const nodeList = document.querySelectorAll(".player-hand");
    const index = playCardHandIndex(nodeList, cardDivTag);

    // 出したカードの数字を表示する
    tmpPlayCard = playerHand[index];
    // pタグ生成し、内容を追加
    const newTag = document.createElement("p");
    const newText = document.createTextNode(`${tmpPlayCard[1]}`);
    newTag.appendChild(newText);
    newTag.classList.add("number");

    // カードを出す
    playArea.appendChild(cardDivTag.firstChild);
    // カードの数字を表示
    playArea.appendChild(newTag);

    
    // 手札を更新
    playerHand[index] = getCardArrayIndex();
    addImgToDivTag(playerHand[index], cardDivTag);
    
    return tmpPlayCard[1];
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

    // 出したカードの数字を表示する
    tmpPlayCard = comHand[index];
    // pタグ生成し、内容を追加
    const newTag = document.createElement("p");
    const newText = document.createTextNode(`${tmpPlayCard[1]}`);
    newTag.appendChild(newText);
    newTag.classList.add("number", "number-com");
    
    // カードを出す
    addImgToDivTag(comHand[index], playArea);
    // カードの数字を表示
    playArea.appendChild(newTag);

    // 手札を更新
    comHand[index] = getCardArrayIndex();

    // 山札が切れたら、手札に追加しない
    if(comHand[index][1] === 0){
        // endクラスを追加し、非表示にする
        const hand = document.querySelectorAll(".com-hand");
        hand[index].classList.add("end");
        // imgを消す
        hand[index].firstChild.remove();
    } 
    
    return tmpPlayCard[1];
}

function showWinOrLoss(player, com){

    return new Promise(resolve =>{
         // 手札のイベントを無効化する
        const cardArea = document.querySelector("#card-area");
        const hand = document.querySelectorAll(".player-hand");
        hand.forEach(el => {
            el.classList.add("event-none");
        });

        // 1秒後に勝敗結果を表示
        setTimeout(() => {
            if(player  !== com){
                // 勝った分のカードを獲得する
                playerCardEarnNum += (player > com ? 2+cardPending : 0);
                comCardEarnNum    += (player < com ? 2+cardPending : 0);
                // 保留カードを0にする
                cardPending = 0;

                // 勝敗テキストを代入
                const resultPlayer = (player > com ? "Win":"Lose");
        
                // 勝敗を表示する
                const newTag = document.createElement("p");
                const newText = document.createTextNode(`${resultPlayer}`);
                newTag.appendChild(newText);
                newTag.classList.add("win-or-loss-text");
                cardArea.appendChild(newTag);
            }
            else {
                // カードを保留する
                cardPending += 2;

                // 引き分けテキストを表示する
                const newTag = document.createElement("p");
                const newText = document.createTextNode("DRAW");
                newTag.appendChild(newText);
                newTag.classList.add("win-or-loss-text");
                cardArea.appendChild(newTag);
            }
            
            // 手札のイベントを復活させる
            hand.forEach(el => {
                el.classList.remove("event-none");
            });
            
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
            const winOrLossText = document.createElement("p");
            winOrLossText.classList.add("result-win-or-loss");
            winOrLossText.innerHTML = `あなたの<br>${(playerCardEarnNum > comCardEarnNum? "勝ちです:)" : "負けです:(")}`;

            // もう一度遊ぶ
            const playAgain = document.createElement("p");
            playAgain.classList.add("page-transition");
            playAgain.innerHTML = "もう一度遊ぶ";
            playAgain.onclick = () => document.location.reload() ;

            // ホームへ戻る
            const backToHome = document.createElement("p");
            backToHome.classList.add("page-transition");
            backToHome.innerHTML = "HOMEに戻る";
            backToHome.onclick = () => document.location.href = "/";

            // 生成した要素をresultに入れる
            result.appendChild(resultTitle);
            result.appendChild(resultText);
            result.appendChild(resultPlayer);
            result.appendChild(resultCom);
            result.appendChild(winOrLossText);
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

function addImgToDivTag(cardArray, div) {
    
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

/*
    優先度順
    tagをElementに変更
    cardDivTagの名前を変更
    最初に説明画面の表示
    現在のカード枚数
    保留カードの表示
    トランプが重ならないように頑張る
    アニメーション
*/