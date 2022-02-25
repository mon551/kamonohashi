'use strict'

// テキストエリア取得
let textarea = document.querySelector("textarea");

// 文字数を表示する場所を取得
let str_len1 = document.querySelector(".str_len1");
let str_len2 = document.querySelector(".str_len2");


// テキストエリアに入力されるたびに呼び出す
textarea.addEventListener("keyup", countLength)

function countLength(){
    // 現在のテキストを取得
    const inputText1 = textarea.value;
    //const inputText2 = inputText1.split(' ').join('');    説明を書く
    const inputText2 = inputText1.replace(/\s+/g, '');
    
    // 文字数を反映させる
    str_len1.textContent = inputText1.length;
    str_len2.textContent = inputText2.length;
}

