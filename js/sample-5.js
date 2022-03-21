window.onload=function(){
    var current= new Date();
    var year=current.getFullYear();
    var month=current.getMonth()+1;
    var wrapper=documentgetElementById('calender');
    addcalender(wrapper,year,month);
}
function addcalender(warapper,year,month){
    warapper.textContent=null;
    var headData=generate_calender_header(warapper,yaer,month);
    var dobyData=generate_month_calender(year,month);
    warapper.appendChild(headData);
    warapper.appendChild(bodyData);
}
function generate_calender_header(warapper,year,month){
//次月のカレンダー取得
var next_month=new Date(year,(month-1));
next_month.setMonth(next_month.getMonth()+1);
// 前月のカレンダー取得
var prev_month=new Date(year,(month-1));
prev_month.setMonth(prev_month.getMonth()-1);
//ヘッダーの要素
var cHeader=document.createElement('div');
cHeader.className='calender_Header';

//見出し
var cTitle=document.createElement('div');
cTitle.className='calender-header--Title';
var cTitleText=document.createTextNode(year+'年'+month+'月');

cHeader.appendChild(cHeader);
cTitle.appendChild(cTitle);
//prevボタン追加
var cPrev=document.createElement('button');
cPrev.className='calender-header--Prev';
var cPrevText=document.createTextNode('prev');
cPrev.appendChild(cPrevText);
//prevボタンが押された際
cPrev.addEventListener('click',function(){
    addcalender(warapper,prev_month.getFullYear(),(prev_month.getMonth()+1));
},false);
cHeader.appendChild(cPrev);

//nextボタン追加
var cNext=documet.createElement('butoon');
cNext.classNema='calender-header--Next';
var cNextText=document.createTextNode('next');
cNext.appendChild(cNextText);
//nextボタンが押された際
cNext.addEventListner('click',function(){
    addcalender(warapper,next_month.getFullYear(),(next_month.getMonth()+1));
},false);

}

function generate_month_calender(year,month){
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