'use strict'
var year=2018;
var month=5;
window.onload=function(){
    var data=generate_month_calendar(year,month);
    document.getElementById('calendar').appendChild(data);
}
function generate_month_calendar(year,month){
    var weekdayData=['日','月','火','水','木','金','土'];
    var calendarData=get_month_calendar(year,month);
    var i=calendarData[0]['weekday'];
    while(i>0){
        i--;
        calendarData.unshift({
            day: '',
            weekday: i
        });
    }

    //カレンダーの要素作成
    var calendartable=document.createElement('table');
    calendartable.className='calendar_table';
    var insertData='';
    //曜日部分の作成
    insertData+='<tread>';
    insertData+='<tr>';
    for (var i = 0; i < weekdayData.length; i++) {
        insertData += '<th>';
        insertData += weekdayData[i];
        insertData += '</th>';
    }
    insertData += '</tr>';
    insertData += '</thead>';
 
    // 日付部分の生成
    insertData += '<tbody>';
    for (var i = 0; i < calendarData.length; i++) {
        if(calendarData[i]['weekday'] <= 0) {
            insertData += '<tr>';
        }
        insertData += '<td>';
        insertData += calendarData[i]['day'];
        insertData += '</td>';
        if(calendarData[i]['weekday'] >= 6) {
            insertData += '</tr>';
        }
    }
    insertData += '</tbody>';
 
    calendartable.innerHTML = insertData;
    return calendartable;
}



function get_month_calendar(year,month){
    var firstDate = new Date(year, (month - 1), 1); // 指定した年月の初日の情報
    var LastDay=new Date(year, (firstDate.getMonth()+1),0).getDate();//指定した年月の末日
    var Weekday=firstDate.getDay();// 指定した年月の初日の曜日
    var calendarData=[];// カレンダーの情報の格納
    var weekdaycount=Weekday// 曜日のカウント用
    for(var i=0;i<LastDay;i++){
        calendarData[i]={
            day:i+1,
            weekday:weekdaycount
        }
        if(weekdaycount>=6){
            weekdaycount=0;
        }else{
            weekdaycount++;
        }
    }
    return calendarData;
}