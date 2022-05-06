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
let comHand = new Array(5);
let playerHand = new Array(5);

// ゲームフラグ
let gameFlg = false;

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
    const child = document.querySelector(".result-text");
    const PCard = document.querySelector(".play-player-card");
    const CCard = document.querySelector(".play-com-card");

    if(child !== null) child.remove();
    while(PCard.firstChild){
        PCard.removeChild(PCard.firstChild);
    }
    while(CCard.firstChild){
        CCard.removeChild(CCard.firstChild);
    }

    // カードを出す(戻り値はカードの数字)
    const numPlayer = playPlayer(cardDivTag);
    const numCom    = playCom();

    const result = function() {
        battle(numPlayer, numCom)
        .then(showResult())
    };

    result();
    
    //battle(numPlayer, numCom);


    //if() result(); endクラスがついているかの判定で出来る

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
    newTag.classList.add("number", "numberCom");
    
    // カードを出す
    addImgToDivTag(comHand[index], playArea);
    // カードの数字を表示
    playArea.appendChild(newTag);

    // 手札を更新
    tmpPlayCard = comHand[index];
    comHand[index] = getCardArrayIndex();

    return tmpPlayCard[1];
}

function battle(player, com){
    console.log(1);
    const cardArea = document.querySelector("#card-area");
    const hand = document.querySelectorAll(".player-hand");
    hand.forEach(el => {
        el.classList.add("event-none");
    });

    return new Promise(resolve =>{
        setTimeout(() => {
            if(player  !== com){
                // 勝敗を代入
                const resultPlayer = (player > com ? "Win":"Lose");
                const resultCom    = (player < com ? "Win":"Lose");
        
                // 勝敗を表示する
                const newTag = document.createElement("p");
                const newText = document.createTextNode(`${resultCom} - ${resultPlayer}`);
                newTag.appendChild(newText);
                newTag.classList.add("result-text");
                cardArea.appendChild(newTag);
            }
            else {
                // 引き分けを表示する
                const newTag = document.createElement("p");
                const newText = document.createTextNode("DRAW");
                newTag.appendChild(newText);
                newTag.classList.add("result-text");
                cardArea.appendChild(newTag);
            }
    
            hand.forEach(el => {
                el.classList.remove("event-none");
            });
        }, 1000);
    });
}

function old_battle(player, com) {
    
    const cardArea = document.querySelector("#card-area");
    const hand = document.querySelectorAll(".player-hand");
    hand.forEach(el => {
        el.classList.add("event-none");
    });

    setTimeout(() => {
        if(player  !== com){
            // 勝敗を代入
            const resultPlayer = (player > com ? "Win":"Lose");
            const resultCom    = (player < com ? "Win":"Lose");
    
            // 勝敗を表示する
            const newTag = document.createElement("p");
            const newText = document.createTextNode(`${resultCom} - ${resultPlayer}`);
            newTag.appendChild(newText);
            newTag.classList.add("result-text");
            cardArea.appendChild(newTag);
        }
        else {
            // 引き分けを表示する
            const newTag = document.createElement("p");
            const newText = document.createTextNode("Draw");
            newTag.appendChild(newText);
            newTag.classList.add("result-text");
            cardArea.appendChild(newTag);
        }

        hand.forEach(el => {
            el.classList.remove("event-none");
        });
    }, 1000);
}

function showResult() {
    setTimeout(() => {
        
    }, 1000)
    
    
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
    // カード数字が0は本来無い
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