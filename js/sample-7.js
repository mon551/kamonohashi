let field = document.querySelector("#card-area");

let comHand = document.querySelectorAll(".com-hand");
let playerHand = document.querySelectorAll(".player-hand");

// トランプの配列を作る
let cards = [];
for(let i=1; i<=4; i++) {
    for(let j=1; j<=13; j++) {
        cards[cards.length] = [i, j, false];
    }
}

const newImg = getImgSrc();


// comHandはNodelistだけどforEachは使える
comHand.forEach( el => {
    el.textContent("あ");
    console.log(el);
});


// 画像を取得
function getImgSrc() {
    // imgタグを新しく作る
    const newImg = document.createElement("img");

    // とりあえず裏面
    newImg.src="../img/cards/card-back.png";

    // 画像サイズを整える(px)
    newImg.width = 50;
    newImg.height = 50;

    return newImg;
}