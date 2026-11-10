(function(){
  var CITY_FILES = {"moskva":"city_moskva.html","himki":"city_himki.html","spb":"city_spb.html","kazan":"city_kazan.html","saratov":"city_saratov.html","kyzyl":"city_kyzyl.html"};
  var CITY_NAMES = {"moskva":"Москве","himki":"Химках","spb":"Санкт-Петербурге","kazan":"Казани","saratov":"Саратове","kyzyl":"Кызыле"};
  function hide(){var g=document.getElementById('geo');if(g)g.style.display='none';}
  window.geoYes=function(){var g=document.getElementById('geo');localStorage.setItem('city',g.dataset.city);location.href=CITY_FILES[g.dataset.city];};
  function show(city){var g=document.getElementById('geo');if(!g)return;g.dataset.city=city;g.querySelector('#geo-text').textContent='Похоже, вы в '+CITY_NAMES[city]+' — показать условия для вашего города?';g.style.display='flex';}
  var saved=localStorage.getItem('city');
  if(saved&&CITY_FILES[saved]){var p=location.pathname.split('/').pop();if(p!==CITY_FILES[saved]){show(saved);return;}}
  fetch('https://ipapi.co/json/').then(function(r){return r.json()}).then(function(d){
    var c=(d.city||'').toLowerCase();
    if(CITY_FILES[c]&&!saved)show(c);
  }).catch(function(){});
})();
