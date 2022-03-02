'use strict'

let formula1, formula2, operand;
formula1 = formula2 = '';
let flg = 1;
let display1 = document.querySelector(".formula1");
let display2 = document.querySelector(".formula2");

// 入力された式を出力する
function outputFormula(value){
    if(flg===1){
        // 入力された値を式に代入
        formula1 += value;
        // 画面に出力する
        display2.textContent = formula1
    } else {
        formula2 += value;
        display2.textContent = formula2;
    }
}

// 入力された式をクリアする
const clearAll = () =>{
    // すべての式をクリアする
    formula1 = formula2 = operand = '';
    flg = 1;
    
    display1.textContent = display2.textContent = '';
}

// 現在入力している式をクリアする
const clearEntry = () =>{
    if(flg == 1){
        formula1 = '';
        display2.textContent = formula1;
    } else {
        formula2 = '';
        display2.textContent = formula2;
    }
}

// 演算子が入力された場合
const inputOperand = (value) =>{
    // 演算子を取得
    operand = value;

    // 画面に出力する
    display1.textContent = formula1+operand;

    flg = 0;
}

// 式を計算する
const calculate = () =>{
    // 入力された式を評価する
    const result = eval(formula1+operand+formula2);

    // 式と結果を出力する
    display1.textContent = formula1+operand+formula2+"=";
    display2.textContent = result;

    // 結果を式に代入する   ここからスタート
    formula1 = result;
}

// 一文字削除する
const eraseCharacter = () =>{
    // 現在入力している式から一文字削除する
    if(flg === 1){
        formula1 = formula1.slice(0, -1);
        display1.textContent = formula1;
    } else {
        formula2 = formula2.slice(0, -1);
        display2.textContent = formula2;
    }
}