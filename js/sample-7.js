let field = document.querySelector("#card-area");

let comHand = document.querySelectorAll(".com-hand");
let playerHand = document.querySelectorAll(".player-hand");

// トランプの配列を作る
let cards = Array(5);
for(let i=0; i<=4; i++) {
    cards[i] = Array(13);

    // カードの初期値を代入
    for(let j=0; j<13; j++) {
        // iが0 && jが2以上だったらtrue
        if(i!==0 || (i===0 && j<2) ){
            cards[i][j] = false;
        } else {
            cards[i][j] = true;
        }
    }
}

// 画面が読み込まれたら
window.onload = () => {
    // comの手札を生成
    comHand.forEach( el => {
        //とりあえず裏
        el.innerHTML = "<img src=\"../img/cards/card-back.png\">";
    });

    // プレイヤーの手札を生成
    playerHand.forEach(el => {
        const img = getImgSrc();

        el.innerHTML = `${img}`;
        el.addEventListener('click', function(){playCard(img, el);}, false);
    });
}

// カードを出す
function playCard(img, el) {
    const comArea = document.querySelector(".play-com-card");
    const playerArea = document.querySelector(".play-player-card");

    playerArea.innerHTML = `${img}`;

    const newImg = getImgSrc();

    el.innerHTML = newImg;
}



// 画像を取得
function getImgSrc() {
    let suit, num;

    do{
        const flg = cards.every(function(val){
            return true;
        });

        // ランダム作成(記号)
        suit = Math.floor(Math.random() * 4 + 1);
        // ランダム作成(数字)
        num = Math.floor(Math.random() * 12 + 1);

    } while(cards[suit][num] == true)

    // 使用済はtureにする
    cards[suit][num] = true;

    return `<img src="../img/cards/${suit}-${num}.png">`;
}