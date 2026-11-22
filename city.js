(function(){
/* Города сайта. Подмосковные страницы: /moskva/podmoskovie/<slug>/index.html */
var CITIES=[
  {slug:'moskva',name:'Москва',aliases:['Москва','Moscow']},
  {slug:'spb',name:'Санкт-Петербург',aliases:['Санкт-Петербург','Санкт Петербург','Saint Petersburg','St. Petersburg']},
  {slug:'moskva/podmoskovie/podolsk',name:'Подольск',aliases:['Подольск','Podolsk','Климовск','Klimovsk']},
  {slug:'moskva/podmoskovie/himki',name:'Химки',aliases:['Химки','Himki','Khimki']},
  {slug:'moskva/podmoskovie/mytishchi',name:'Мытищи',aliases:['Мытищи','Mytishchi']},
  {slug:'moskva/podmoskovie/krasnogorsk',name:'Красногорск',aliases:['Красногорск','Krasnogorsk']},
  {slug:'moskva/podmoskovie/odintsovo',name:'Одинцово',aliases:['Одинцово','Odintsovo','Odintcovo']},
  {slug:'moskva/podmoskovie/balashiha',name:'Балашиха',aliases:['Балашиха','Balashikha']},
  {slug:'moskva/podmoskovie/lyubertsy',name:'Люберцы',aliases:['Люберцы','Lyubertsy']},
  {slug:'moskva/podmoskovie/vidnoe',name:'Видное',aliases:['Видное','Vidnoe','Vidnoye']},
  {slug:'moskva/podmoskovie/domodedovo',name:'Домодедово',aliases:['Домодедово','Domodedovo']},
  {slug:'moskva/podmoskovie/zhukovskiy',name:'Жуковский',aliases:['Жуковский','Zhukovskiy','Zhukovsky']},
  {slug:'moskva/podmoskovie/shchyolkovo',name:'Щёлково',aliases:['Щёлково','Щелково','Shchyolkovo','Shchelkovo']},
  {slug:'moskva/podmoskovie/chekhov',name:'Чехов',aliases:['Чехов','Chekhov','Chehov']},
  {slug:'moskva/podmoskovie/dmitrov',name:'Дмитров',aliases:['Дмитров','Dmitrov']},
  {slug:'moskva/podmoskovie/dubna',name:'Дубна',aliases:['Дубна','Dubna']},
  {slug:'moskva/podmoskovie/serpukhov',name:'Серпухов',aliases:['Серпухов','Serpukhov','Serpukh']},
  {slug:'moskva/podmoskovie/kolomna',name:'Коломна',aliases:['Коломна','Kolomna']},
  {slug:'moskva/podmoskovie/orekhovo-zuevo',name:'Орехово-Зуево',aliases:['Орехово-Зуево','Орехово Зуево','Orekhovo-Zuevo','Orekhovo Zuevo']},
  {slug:'moskva/podmoskovie/naro-fominsk',name:'Наро-Фоминск',aliases:['Наро-Фоминск','Наро Фоминск','Naro-Fominsk','Naro Fominsk']},
  {slug:'moskva/podmoskovie/egorevsk',name:'Егорьевск',aliases:['Егорьевск','Egorevsk','Yegoryevsk']},
  {slug:'moskva/podmoskovie/stupino',name:'Ступино',aliases:['Ступино','Stupino']},
  {slug:'moskva/podmoskovie/voskresensk',name:'Воскресенск',aliases:['Воскресенск','Voskresensk']},
  {slug:'moskva/podmoskovie/reutov',name:'Реутов',aliases:['Реутов','Reutov']},
  {slug:'moskva/podmoskovie/zheleznodorozhny',name:'Железнодорожный',aliases:['Железнодорожный','Zheleznodorozhny']},
  {slug:'moskva/podmoskovie/zelenograd',name:'Зеленоград',aliases:['Зеленоград','Zelenograd','Zelenogradskiy okrug']},
  {slug:'moskva/podmoskovie/ramenskoe',name:'Раменское',aliases:['Раменское','Ramenskoe','Ramenskoye']},
  {slug:'moskva/podmoskovie/noginsk',name:'Ногинск',aliases:['Ногинск','Noginsk']},
  {slug:'moskva/podmoskovie/elektrostal',name:'Электросталь',aliases:['Электросталь','Elektrostal','Electrostal']},
  {slug:'moskva/podmoskovie/zvenigorod',name:'Звенигород',aliases:['Звенигород','Zvenigorod']}
];
/* Прямоугольник Зеленограда (ЗелАО) для определения по координатам */
var ZEL={lat1:55.93,lat2:56.02,lon1:37.08,lon2:37.28};
function inZel(d){
  return d&&typeof d.latitude==='number'&&typeof d.longitude==='number'
    &&d.latitude>=ZEL.lat1&&d.latitude<=ZEL.lat2&&d.longitude>=ZEL.lon1&&d.longitude<=ZEL.lon2;
}
function cityPath(c){return '/'+c.slug+'/';}
function findCity(slug){for(var i=0;i<CITIES.length;i++){if(CITIES[i].slug===slug)return CITIES[i];}return null;}
function save(slug){try{localStorage.setItem('city',slug);}catch(e){}}
function getSaved(){try{return localStorage.getItem('city');}catch(e){return null;}}

var pendingService=null;
var modal=null;
var bar=null;

/* Открытие/закрытие — напрямую через display, классы тут не работают:
   инлайновый display:none перебивает любое CSS-правило */
function openModal(s){
  pendingService=s||null;
  hideBar();
  modal.style.display='flex';
}
function closeModal(){modal.style.display='none';}
function pickCity(slug){
  save(slug);
  hideBar();
  var c=findCity(slug);
  if(c){
    modal.style.display='none';
    location.href=cityPath(c)+(pendingService?pendingService+'/':'');
  }
  return false;
}
function goCity(service){
  var saved=getSaved();
  if(saved&&findCity(saved)){
    location.href=cityPath(findCity(saved))+(service?service+'/':'');
    return;
  }
  openModal(service);
}
window.goCity=goCity;

function norm(s){return (s||'').toLowerCase().replace(/\s+/g,' ').replace(/ё/g,'е');}

/* Плашка «Ваш город — X?» — показывается один раз, до первого подтверждения */
function hideBar(){if(bar){bar.remove();bar=null;}}
function showBar(cityName,yesLabel,onYes,onNo){
  if(bar)return;
  bar=document.createElement('div');
  bar.id='cityBar';
  bar.style.cssText='display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;max-width:960px;margin:12px auto 0;padding:12px 16px;font-size:14px;border:1px solid #E3E7EC;border-radius:12px;background:#fff';
  bar.innerHTML='Ваш город — <b>'+cityName+'</b>?'
    +'<button id="barYes" style="padding:6px 16px;border:0;border-radius:999px;background:#2B5CFF;color:#fff;font-weight:600;cursor:pointer">'+yesLabel+'</button>'
    +'<button id="barNo" style="padding:6px 16px;border:1px solid #E3E7EC;border-radius:999px;background:#fff;color:#6B7280;cursor:pointer">Выбрать другой</button>';
  document.body.insertBefore(bar,document.body.firstChild);
  document.getElementById('barYes').onclick=function(){hideBar();onYes();};
  document.getElementById('barNo').onclick=function(){hideBar();onNo();};
}

function detect(){
  var saved=getSaved();
  if(saved&&findCity(saved)) return;
  fetch('https://ipwho.is/')
    .then(function(r){return r.json();})
    .then(function(d){
      if(!d||!d.success) return;
      /* 1. Город распознан по названию — плашка с подтверждением */
      var hit=null;
      CITIES.forEach(function(c){
        if(c.aliases.some(function(a){return norm(a)===norm(d.city);})) hit=c;
      });
      if(hit){
        showBar(hit.name,'Да, верно',
          function(){save(hit.slug);},
          function(){openModal(null);}
        );
        return;
      }
      /* 2. Вернулась Москва, но координаты — Зеленоград: плашка Зеленограда */
      var isMsk=(norm(d.city)==='москва'||norm(d.city)==='moscow');
      if(isMsk&&inZel(d)){
        showBar('Зеленоград','Да, перейти',
          function(){pickCity('moskva/podmoskovie/zelenograd');},
          function(){save('moskva');openModal(null);}
        );
      }
      /* Москва без зеленоградских координат попадает в пункт 1 — у неё есть алиас */
    }).catch(function(){});
}

/* Модалка выбора города — создаётся скриптом, разметка в HTML не нужна */
modal=document.createElement('div');
modal.id='cityModal';
modal.style.cssText='display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);align-items:center;justify-content:center;z-index:10';
modal.innerHTML='<div style="background:#fff;border-radius:14px;padding:24px;max-width:360px;width:90%;max-height:85vh;overflow-y:auto;text-align:center;font-family:inherit">'
  +'<p style="font-weight:700;margin-bottom:14px">Выберите ваш город</p>'
  +'<div id="modalMain"></div>'
  +'<p style="font-weight:600;color:#6B7280;font-size:13px;margin:12px 0 10px;text-transform:uppercase;letter-spacing:.04em">Города Подмосковья</p>'
  +'<div id="modalMsk"></div>'
  +'<p style="margin-top:10px"><a href="#" id="modalClose" style="color:#6B7280">Отмена</a></p></div>';
document.body.appendChild(modal);

function btn(c){return '<a href="#" data-slug="'+c.slug+'" style="display:block;text-align:center;background:#fff;color:#1a1a1a;font-weight:600;font-size:16px;padding:11px 16px;border:1px solid #E3E7EC;border-radius:999px;text-decoration:none;margin-bottom:8px">'+c.name+'</a>';}
document.getElementById('modalMain').innerHTML=CITIES.slice(0,2).map(btn).join('');
document.getElementById('modalMsk').innerHTML=CITIES.slice(2).map(btn).join('');
document.getElementById('modalClose').addEventListener('click',function(e){e.preventDefault();closeModal();});
document.querySelectorAll('#cityModal a[data-slug]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();pickCity(a.dataset.slug);});});
modal.addEventListener('click',function(e){if(e.target===modal)closeModal();});

/* Список городов в футере — заполняется там, где есть #cityList */
var cl=document.getElementById('cityList');
if(cl){cl.innerHTML=CITIES.map(function(c){return '<a href="'+cityPath(c)+'">'+c.name+'</a>';}).join(', ');}

detect();
})();


