let field = document.querySelector("#card-area");

let comHand = document.querySelectorAll(".com-hand");
let playerHand = document.querySelectorAll(".player-hand");

const comArea = document.querySelector(".play-com-card");
const playerArea = document.querySelector(".play-player-card");


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
    console.log(el);
    console.log(img);
    playerArea.innerHTML = `${img}`;

    const newImg = getImgSrc();
    

    
    el.innerHTML = newImg;
}

// カードをすべて出したか判定
// メソッド名変更


// 画像を取得
function getImgSrc() {
    let img, flg;

    
    // flg が false の場合まだカードを出し切っていない
    //if(flg === false){
        let suit, num;

        

        do {
            // ランダムでトランプ番号作成
            suit = Math.floor(Math.random() * 4 + 1);
            num = Math.floor(Math.random() * 12 + 1);
        } 
        while(cards[suit][num] == true);

        // 使用済はtureにする
        cards[suit][num] = true;

        img = `<img src=\"../img/cards/${suit}-${num}.png\">`;
    /*
    }
    else {
        // 裏面
        img = "<img src=\"../img/cards/card-back.png\">";
    }
    */
    return img;
}
