let field = document.querySelector("#card-area");

// トランプの配列を作る
let cards = [];
for(let i=1; i<=4; i++) {
    for(let j=1; j<=13; j++) {
        cards[cards.length] = [i, j, false];
    }
}

const newImg = getImgSrc();

field.appendChild(newImg);

function getImgSrc() {
    // imgタグを新しく作る
    const newImg = document.createElement("img");

    // とりあえず裏面
    newImg.src="../img/cards/card-back.png";

    // 画像サイズを整える(px)
    newImg.width = 120;
    newImg.height = 170;

    return newImg;
}