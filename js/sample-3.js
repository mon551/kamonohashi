'use strict'

let formula1, formula2, operand;
formula1 = formula2 = '';
let flg = 1;
let sub_display = document.querySelector(".sub-disp");
let main_display = document.querySelector(".main-disp");

// 入力された式を出力する
function outputFormula(value){
    if(flg===1){
        // 入力された値を式に代入
        formula1 += value;
        // 画面に出力する
        main_display.textContent = formula1
    } else {
        formula2 += value;
        main_display.textContent = formula2;
    }
}

// 入力された式をクリアする
const clearAll = () =>{
    // すべての式と画面をクリアする
    formula1 = formula2 = operand = '';
    sub_display.textContent = main_display.textContent = '';

    // フラグ変更
    flg = 1;
}

// 現在入力している式をクリアする
const clearEntry = () =>{
    if(flg == 1){
        formula1 = '';
        main_display.textContent = formula1;
    } else {
        formula2 = '';
        main_display.textContent = formula2;
    }
}

// 演算子が入力された場合
const inputOperand = (value) =>{
    // 演算子を取得
    operand = value;

    // 画面に出力する
    sub_display.textContent = formula1+operand;

    flg = 0;
}

// 式を計算する
const calculate = () =>{
    // 式を評価する
    const result = eval(formula1+operand+formula2);

    // 式と結果を出力する
    sub_display.textContent = formula1+operand+formula2+"=";
    main_display.textContent = result;

    // 結果を式に代入する
    formula1 = result;
    formula2 = ''
}

// 一文字削除する
const eraseCharacter = () =>{
    // 現在入力している式から一文字削除する
    if(flg === 1){
        formula1 = formula1.slice(0, -1);
        main_display.textContent = formula1;
    } else {
        formula2 = formula2.slice(0, -1);
        main_display.textContent = formula2;
    }
}