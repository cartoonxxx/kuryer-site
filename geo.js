(function(){
  var CITIES={"moskva":"Москва","spb":"Санкт-Петербург","kazan":"Казань","saratov":"Саратов","kyzyl":"Кызыл","himki":"Химки"};
  var page=document.body.dataset.city;
  var saved=localStorage.getItem("city");
  if(page){ if(saved!==page){localStorage.setItem("page_"+page,1);} return; }
  fetch("https://ipapi.co/json/").then(function(r){return r.json()}).then(function(d){
    var city=(d.city||"").toLowerCase(), map={"москва":"moskva","moscow":"moskva","санкт-петербург":"spb","казань":"kazan","саратов":"saratov","химки":"himki","кызыл":"kyzyl"};
    var slug=map[city];
    if(slug&&slug!==saved){
      var b=document.getElementById("geobanner"); if(!b)return;
      document.getElementById("geotext").textContent="Похоже, вы в "+CITIES[slug]+". Показать условия для вашего города?";
      b.classList.add("show");
      document.getElementById("geoyes").onclick=function(){location="city_"+slug+".html"};
      document.getElementById("geono").onclick=function(){b.classList.remove("show")};
    }
  }).catch(function(){});
})();