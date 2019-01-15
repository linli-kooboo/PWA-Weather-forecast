var initialData = {
  city: '北京',
  date: format(new Date()),
  weather: {
    img: './images/fine.png',
    temperature: '10℃'
  },
  forecast: [{date:'15', high:'10℃', low:'1℃', type:'晴'},
             {date:'16', high:'10℃', low:'1℃', type:'晴'},
             {date:'17', high:'10℃', low:'1℃', type:'晴'},
             {date:'18', high:'10℃', low:'1℃', type:'晴'},
             {date:'19', high:'10℃', low:'1℃', type:'晴'},
             {date:'20', high:'10℃', low:'1℃', type:'晴'},
             {date:'21', high:'10℃', low:'1℃', type:'晴'}]
};

function format (date) {
  return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'
}

(function (){
  var city = document.querySelector('.city');
  var date = document.querySelector('.date');
  var weather = document.querySelector('.weather');
  var forecast = document.querySelector('.forecast');
  var html = '';

  city.innerHTML = initialData.city;
  date.innerHTML = initialData.date;
  weather.innerHTML = `<img src="${initialData.weather.img}">
                       <span>${initialData.weather.temperature}</span>`;
  html = '';
  initialData.forecast.map(
    i => `<div class="forecast__info">
            <div class="forecast__info__date">${i.date}</div>
            <div class="forecast__info__weather">${i.type}</div>
            <div class="forecast__info__high">${i.high}</div>
            <div class="forecast__info__low">${i.low}</div>
          </div>`
  ).map(i => html += i);
  forecast.innerHTML = html;
})();