// 場に出したカードの数値を代入する
let comNum, playerNum;

// トランプの配列を作る
// カードが未使用だったら false  使用済みだったらtrue 
let cards = Array(5);
for(let i=0; i<5; i++) {
    cards[i] = Array(13);

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
let arraySuit = Array(5);
for(let i=0; i<5; i++){
    arraySuit[i] = false;
}
// 今回ジョーカーは使わない
arraySuit[0] = true;



// 画面が読み込まれたら
window.onload = () => {
    // comの手札を生成
    for(let i=0; i<5; i++){
        // comの手札を置く場所を取得
        const comArea = document.querySelector("#com-area");

        

        const newImg = document.createElement("img");

        newImg.src = "../img/cards/card-back.png";
        newImg.classList.add("com-hand");

        comArea.appendChild(newImg);
    }

    // プレイヤーの手札を生成
    for(let i=0; i<5; i++){
        // プレイヤーの手札を置く場所を取得 
        const playerArea = document.querySelector("#player-area");

        // divタグ生成
        const newDiv = document.createElement("div");
        newDiv.classList.add("player-hand");
        // divタグ追加し、取得
        playerArea.appendChild(newDiv);
        const playerHand = playerArea.lastChild;

        // 画像を取得し div タグの下に追加する
        playerHand.appendChild(getImgObj() );
    }

    // プレイヤーの手札を取得し、クリックイベントを付与する
    const playerHand = document.querySelectorAll(".player-hand");
    playerHand.forEach(el => {
        el.addEventListener('click', function(){playCard(el); }, false )
    });
}

// カードを出す
function playCard(el) {
    // カードを出す場所を取得
    const playComArea = document.querySelector(".play-com-card");
    const playPlayerArea = document.querySelector(".play-player-card");
    // 場にあるカードを取得
    const playedCard = document.querySelector(".play-player-card img");
    const playedComCard = document.querySelector(".play-com-card img");

    // 場にあるカードを消す
    if(playedCard !== null) playedCard.remove();
    if(playedComCard !== null) playedComCard.remove();

    // 出すカードを取得し、カード置き場に出す
    const playImg = el.firstChild;
    playPlayerArea.appendChild(playImg);

    // comのカードを置き場に出す
    playComArea.appendChild(getImgObj() );
    
    // 手札を新しく追加
    el.appendChild(getImgObj() );
}

// 画像を取得
function getImgObj() {
    // img要素を作成
    const newImg = document.createElement("img");

    // カードが残っているか判定
    if( arraySuit.some(val => val === false) ){
        // 記号を確定する
        let suit;
        do {
            suit = Math.floor(Math.random() * 4 + 1);
        }
        while(arraySuit[suit] == true);

        // 数字を確定する
        let num;
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

        newImg.src = `../img/cards/${suit}-${num}.png`;
    }
    else {
        // 裏面
        newImg.src = "../img/cards/card-back.png";
    }

    return newImg;
}