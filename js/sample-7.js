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

// 画面が読み込まれたら
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
        
        // com手札のカード配列と表示する場所を渡す
        // [0,0]でカードの裏面を表示
        addImgToDivTag([0,0], newDiv);

        // img要素を持ったdivタグをcom手札に追加する
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
    const playerHndNodeList = document.querySelectorAll(".player-hand");
    playerHndNodeList.forEach(el => {
        el.addEventListener('click', function(){playCard(el); }, false )
    });
}

// カードを出す
function playCard(cardDivTag /*or cardLoc*/ ) {
    // 出すカードの手札のインデックスを取得
    const nodeList = document.querySelectorAll(".player-hand");
    const index = playCardHandIndex(nodeList, cardDivTag);
    

    // 場にあるカードを消去
    const playedCard = document.querySelector(".play-player-card img");
    const playedComCard = document.querySelector(".play-com-card img");
    if(playedCard !== null) playedCard.remove();
    if(playedComCard !== null) playedComCard.remove();

    // カードを出す場所を取得
    const playComArea = document.querySelector(".play-com-card");
    const playPlayerArea = document.querySelector(".play-player-card");

    // 出すカードを取得し、カード置き場に出す
    const CardImg = cardDivTag.firstChild;
    playPlayerArea.appendChild(CardImg);


    battle();

    // 手札を追加
    playerHand[index] = getCardArrayIndex();

    /*
    // 手札を新しく追加
    el.appendChild(getImgObj() );
    */
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

function addImgToDivTag(cardArray, cardLoc) {
    
    const newImg = document.createElement("img");

    // cardArray[1]はカード数字が入る
    // カード数字が0は本来無い
    if( cardArray[1] !== 0){
        newImg.src = `../img/cards/${cardArray[0]}-${cardArray[1]}.png`;
    }
    else {
        newImg.src = "../img/cards/card-back.png";
    }
    
    cardLoc.appendChild(newImg);
}

function playCardHandIndex(nodeList, target) {
    return Array.prototype.indexOf.call(nodeList, target);
}

function battle() {
    
}