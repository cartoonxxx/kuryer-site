// Гео-подсказка: определяет город по IP и предлагает страницу города.
// Выбор запоминается в localStorage. Без автоперехода.
(function(){
  var CITY_PAGE={
    "Москва":"city_moskva.html",
    "Санкт-Петербург":"city_spb.html",
    "Казань":"city_kazan.html",
    "Саратов":"city_saratov.html",
    "Кызыл":"city_kyzyl.html",
    "Химки":"city_himki.html"
  };
  var current=location.pathname.split("/").pop();
  if(localStorage.getItem("geoSeen"))return;
  fetch("https://ipapi.co/json/").then(function(r){return r.json()}).then(function(d){
    var city=d&&d.city; if(!city||!CITY_PAGE[city])return;
    if(current===CITY_PAGE[city])return;
    show(city,CITY_PAGE[city]);
  }).catch(function(){});
  function show(city,page){
    var b=document.createElement("div");b.id="geo";
    b.innerHTML='<div class="wrap"><span>Похоже, вы в '+city+'. Показать условия работы курьером в вашем городе?</span>'+
      '<button class="yes">Да, показать</button><button class="no">Оставить текущую</button></div>';
    document.body.prepend(b);b.style.display="block";
    b.querySelector(".yes").onclick=function(){localStorage.setItem("geoSeen","1");location.href=page};
    b.querySelector(".no").onclick=function(){localStorage.setItem("geoSeen","1");b.remove()};
  }
})();
