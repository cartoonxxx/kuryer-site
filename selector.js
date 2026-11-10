var CITIES=[["moskva","Москва"],["spb","Санкт-Петербург"],["kazan","Казань"],["saratov","Саратов"],["kyzyl","Кызыл"],["himki","Химки"]];
var sel=document.getElementById("citysel");
if(sel){sel.innerHTML='<option value="">— выберите город —</option>'+CITIES.map(function(c){return '<option value="'+c[0]+'">'+c[1]+'</option>'}).join("");
sel.onchange=function(){if(sel.value)location="city_"+sel.value+".html"};}