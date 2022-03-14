// 手番を設定   0:〇 1:✕
let turn = 0;
// テーブルを取得する
let table = document.querySelectorAll("td");
let field = Array(9);

console.log(field[2]);

// クリックされたら
for(let i=0; i<field.length; i++){

    table[i].addEventListener("click", () => {
        //if(){
            const newImg = document.createElement("img");

            newImg.src = "../img/sample-4_maru.jpg";

            field[2].appendChild(newImg);
        //}
    }, false);
}