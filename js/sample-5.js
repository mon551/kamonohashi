const week=["日","月","火","水","木","金","土"];
const today=new Date();

//取得した年月の一日目で作成する
var showDate = new Date(today.getFullYear(), today.getMonth(),1);

//初期表示
window.onload=function(){
    showProcess(today,calendar);
};
function prev(){
    showDate.setMonth(showDate.getMonth()-1);
    showProcess(showDate);
}

function next(){
    showDate.setMonth(showDate.getMonth()+1);
    showProcess(showDate);
}

//カレンダーを表示する関数
function showProcess(date){
    var year=date.getFullYear();
    var month=date.getMonth();
    document.querySelector('#warapper-header').innerHTML=year+"年"+(month+1)+"月";
    var calendar=createProcess(year,month);
    document.querySelector('#calendar').innerHTML=calendar;
}

function createProcess(year,month){
    var calendar = "<table><tr class ='dayOfWeek'>";
    for(var i=0; i<week.length; i++){
        calendar+="<th>"+week[i]+"</th>";
    }
    calendar+="</tr>";

    var count=0;
    var startDayOfWeek = new Date(year, month, 1).getDay();
    var endDate =new Date(year,month+1,0).getDate();
    var lastMonthEndDate = new Date(year, month,0).getDate();
    var row = Math.ceil((startDayOfWeek+endDate)/week.length);

    //1行ずつ(外側)のforループ
    for(var i=0; i<row;i++){
        calendar+="<tr>";
        //1日ずつ(内側)のforループ 
        for(var j=0; j<week.length;j++){
            //先月までの日付を決定
            if(i==0 && j<startDayOfWeek){
                calendar+="<td class='disabled'>"+(lastMonthEndDate-startDayOfWeek+j+1)+"</td>";
            }else if(count>=endDate){
                count++;
                calendar+="<td class ='disabled'>"+(count-endDate)+"</td>";
            }else{
                count++;
                if(year==today.getFullYear() && (month==today.getMonth()) && count==today.getDate()){
                    calendar+="<td class ='today'>"+count+"</td>";
                }else{
                    calendar+="<td>"+count + "</td>";
                }
            }
        }
        calendar+="</tr>";
    }
    return calendar;
}

