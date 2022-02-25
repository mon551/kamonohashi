
ヘッダーの共通化
function header(){
    $.ajax({
        url: "/header.html",
        cache: false,
        success: function(html){
            document.textContent(html);
        }
    });
}


// コードをタブ表示する処理
// タブをすべて取得
const tabs = document.querySelectorAll("#tab-name *");

// クリックイベント埋め込み
for(let i = 0; i<tabs.length; i++){
    tabs[i].addEventListener("click", tabSwitch, false);
}

function tabSwitch(){
    // activeを移動
    document.getElementByClassName('active')[0].classList.remove('active');
    this.ClassList.add('active');
    
    // showを移動
    const index = tabs.index[this]
    document.getElementsByClassName('show')[0].classList.remove('show');
    
    
}