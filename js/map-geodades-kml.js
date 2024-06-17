

document.addEventListener("DOMContentLoaded", () => {


  /* map only direction */
  // var mapa = document.querySelector('.map__wrap');
  // if (mapa) {
  //   var map = L.map('map').setView([41.1438632,1.1106476], 13);
  //   L.tileLayer('https://geoserveis.icgc.cat/servei/catalunya/contextmaps/wmts/contextmaps-mapa-estandard/MON3857NW/{z}/{x}/{y}.png', {
  //       maxZoom: 19,
  //       attribution: '&copy; Catalunya: Institut Cartogràfic i Geològic de Catalunya <a href="https://openicgc.github.io/">IGCC</a>'
  //   }).addTo(map);
  // }
  
  var mapa_c6 = document.querySelector('.map__wrap--kml');
  if (mapa_c6) {

    /* create map */
    var map = L.map('map').setView([41.1438632,1.1106476], 13);
    var baseMap = L.tileLayer('https://geoserveis.icgc.cat/servei/catalunya/contextmaps/wmts/contextmaps-mapa-estandard/MON3857NW/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; Catalunya: Institut Cartogràfic i Geològic de Catalunya <a href="https://openicgc.github.io/">ICGC</a>'
    });
 
   /* add map */
    baseMap.addTo(map);

   /* capes layers */
    var baseMaps = {
        "ICGC": baseMap
    };

    /* add icon */
    const baseIcon = L.icon({
      iconUrl: 'js/data/verds/images/icon-1.png',
      iconSize: [36, 36],
      iconAnchor: [16, 40],
      popupAnchor: [0, -28]
    });
    //console.log(baseIcon);
    var styles = {
      color:'#0F9D58',
      fillOpacity: 0.5,
      fillColor: '#0F9D58'
    };

    /* kml */
    var geodades = '';
    var url = 'js/data/verds/doc.kml';
    fetch(url)  //get the location with the new name of the saved file
      .then(res => res.text())
      .then(kmltext => {
          // Create new kml overlay
          const track = new omnivore.kml.parse(kmltext);
          console.log(track);
          map.addLayer(track);   
          const bounds = track.getBounds();
          map.styles

          track.eachLayer(function(layer) {
            //console.log(layer);
            console.log(layer.feature);
            if (layer instanceof L.Marker) {
                layer.setIcon(baseIcon);
                /* only layer marker */
                layer.bindPopup(
                  '<img class="map__icon" src="icon.png" height="24"> Sportguide <br>'+
                  layer.feature.properties.description + '<br>'+
                  '<h2>' + layer.feature.properties.name+'</h2>');
            }

            if (layer instanceof  L.Polygon) {
              layer.setStyle(styles);

              layer.bindPopup(
                  '<img class="map__icon" src="icon.png" height="24"> Sportguide <br>'+
                  '<h3><b>' + layer.feature.properties.name +'</b></h3>'+
                  layer.feature.properties.description);
            }

            /* all layers */
            
          });

      
          map.fitBounds(bounds);

        var overlayMaps = {
            "Espais verds": track
        };

        var layerControl = L.control.layers(baseMaps, overlayMaps,{position: 'topright',collapsed: false}).addTo(map);


      }).catch((e) => {
          console.log(e);
      });

  }
  
});

