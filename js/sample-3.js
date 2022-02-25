'use strict'

let formula = '';
let display = document.querySelector(".display");

// 入力された式を出力する
function outputFormula(value){
    formula += value;

    display.textContent = formula;
}

// 入力された式をクリアする(どちらの書き方でもよい)
const clearScreen = () =>{
    formula = '';

    display.textContent = formula;
}

// 式を計算する
const calculate = () =>{
    formula = eval(formula);

    display.textContent = formula;
}

// 一文字削除する
const eraseCharacter = () =>{
    formula = formula.slice(0, -1);

    display.textContent = formula;
}