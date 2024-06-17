

document.addEventListener("DOMContentLoaded", () => {

  /* test console log */
  console.log("Hello PAU16!");

  /* includes html static html */
  w3.includeHTML();

  /* slider or slideshow */
  var slider = document.querySelectorAll('.slider__image');
  if (slider.length > 0) {
    w3.slideshow(".slider__image", 4000);
  }

  /* mapes */
  var mapa = document.querySelectorAll('.map__wrap--e1');
  if (mapa.length > 0) {
    var map = L.map('map').setView([41.1438632,1.1106476], 13);
    L.tileLayer('https://geoserveis.icgc.cat/servei/catalunya/contextmaps/wmts/contextmaps-mapa-estandard/MON3857NW/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; Catalunya: Institut Cartogràfic i Geològic de Catalunya <a href="https://openicgc.github.io/">ICGC</a>'
    }).addTo(map);
    var estiloPopup = {'maxWidth': '300'}
    var iconoBase = L.Icon.extend({
      options: {
          iconSize:     [38, 95],
          iconAnchor:   [22, 94],
          popupAnchor:  [-3, -76]
      }
  });

  L.marker([41.167463, 1.087167]).bindPopup(" <img class='map__image' src='img/news/news-3.jpg' alt=''><h1>Passeig de la Boca de la Mina</h2><p>Passeig de La Boca de la Mina, 43206 Reus, Tarragona</p>",estiloPopup).addTo(map);

}
var mapa2 = document.querySelectorAll('.map__wrap--e2');
if (mapa2.length > 0) {
  var map = L.map('map').setView([41.1438632,1.1106476], 13);
  L.tileLayer('https://geoserveis.icgc.cat/servei/catalunya/contextmaps/wmts/contextmaps-mapa-estandard/MON3857NW/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; Catalunya: Institut Cartogràfic i Geològic de Catalunya <a href="https://openicgc.github.io/">ICGC</a>'
  }).addTo(map);
  var estiloPopup = {'maxWidth': '300'}
  var iconoBase = L.Icon.extend({
    options: {
        iconSize:     [38, 95],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
});

L.marker([41.138293, 1.095868]).bindPopup(" <img class='map__image' src='img/news/news-2.jpg' alt=''><h1>Tennis Monterols</h2><p>Ctra. de Reus a Cambrils, km 1, 43206 Reus, Tarragona</p>",estiloPopup).addTo(map);

}
  
  
});

