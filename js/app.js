

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
  var mapa = document.querySelectorAll('.map__wrap');
  if (mapa.length > 0) {
    var map = L.map('map').setView([41.1438632,1.1106476], 13);
    L.tileLayer('https://geoserveis.icgc.cat/servei/catalunya/contextmaps/wmts/contextmaps-mapa-estandard/MON3857NW/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; Catalunya: Institut Cartogràfic i Geològic de Catalunya <a href="https://openicgc.github.io/">IGCC</a>'
    }).addTo(map);
  }
  
  
});

