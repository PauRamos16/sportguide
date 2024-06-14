

document.addEventListener("DOMContentLoaded", () => {

  var mapa_c5 = document.querySelector('.map__wrap--c5');
  if (mapa_c5) {

    /* create map */
    var map = L.map('map').setView([41.1438632, 1.1106476], 13);
    var baseMap = L.tileLayer('https://geoserveis.icgc.cat/servei/catalunya/contextmaps/wmts/contextmaps-mapa-estandard/MON3857NW/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; Catalunya: Institut Cartogràfic i Geològic de Catalunya <a href="https://openicgc.github.io/">IGCC</a>'
    });

    
   /* add map */
    baseMap.addTo(map);

   /* capes layers */
    var baseMaps = {
        "ICGC": baseMap
    };

    /* add icon */
    const baseIcon = L.icon({
      iconUrl: 'js/data/tenis/images/icon-1.png',
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      popupAnchor: [0, -28]
    });
    //console.log(baseIcon);

    var styles = {
      color:'#FFEA00',
      fillOpacity: 0.5,
      fillColor: '#FFEA00'
    };

    /* load properties */
    function onEachFeature(feature, layer) {
      let popupContent = `<p>I started out as a GeoJSON ${feature.geometry.type}, but now I'm a Leaflet vector!</p>`;

      if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
      }

      layer.bindPopup(popupContent);
    }

      var geodades = L.geoJson(null);
      var url = 'js/data/tenis/doc.geojson';
      fetch(url) 
        .then(res => res.json())
        .then(function (res) {
          console.log(res)
          geodades.addData(res);
          console.log(geodades);

          geodades.eachLayer(function(layer) {
            
            if (layer instanceof L.Marker) {
                layer.setIcon(baseIcon);

                /* only layer marker */
                layer.bindPopup(
                  '<img src="icon.png" height="24"> Sportguide <br><br>'+
                  layer.feature.properties.description + '<br>'+
                  '<h2>' + layer.feature.properties.Name+'</h2>')
            }

            if (layer instanceof  L.Polygon) {
              layer.setStyle(styles);
              console.log(layer.feature);

              layer.bindPopup(
                  '<img src="icon.png" height="24"> Sportguide <br><br>'+
                  '<h3><b>' + layer.feature.properties.name +'</b></h3>'+
                  layer.feature.properties.description);
            }
            
          });

        })
        .catch(function(e) {
          console.log(e);
        });


        geodades.addTo(map);



        /* capes layers */
        var overlayMaps = {
            "Espai c5": geodades
        };
        var layerControl = L.control.layers(baseMaps, overlayMaps,{position: 'topright',collapsed: false}).addTo(map);

  }
  
  /* exemple KML */
  var mapa_c6 = document.querySelector('.map__wrap--c6');
  if (mapa_c6) {

    /* create map */
    var map = L.map('map').setView([41.1438632,1.1106476], 13);
    var baseMap = L.tileLayer('https://geoserveis.icgc.cat/servei/catalunya/contextmaps/wmts/contextmaps-mapa-estandard/MON3857NW/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; Catalunya: Institut Cartogràfic i Geològic de Catalunya <a href="https://openicgc.github.io/">IGCC</a>'
    });

 
   /* add map */
    baseMap.addTo(map);

   /* capes layers */
    var baseMaps = {
        "ICGC": baseMap
    };

    /* add icon */
    const baseIcon = L.icon({
      iconUrl: 'js/data/tenis/images/icon-1.png',
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      popupAnchor: [0, -28]
    });
    //console.log(baseIcon);
   
    var styles = {
      color:'#FFEA00',
      fillOpacity: 0.5,
      fillColor: '#FFEA00'
    };

    /* kml */
    var geodades = '';
    var url = 'js/data/tenis/doc.kml';
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
            }

            if (layer instanceof  L.Polygon) {
              layer.setStyle(styles);
            }

           

            layer.bindPopup(
              '<img src="icon.png" height="24"> Sportguide <br><br>'+
              layer.feature.properties.description + '<br>'+
              '<h3>' + layer.feature.properties.name+'</h3>');
            
            
          });

      
          map.fitBounds(bounds);

        var overlayMaps = {
            "Espai tennis": track
        };

        var layerControl = L.control.layers(baseMaps, overlayMaps,{position: 'topright',collapsed: false}).addTo(map);


      }).catch((e) => {
          console.log(e);
      });




      

      

     


  }
  
});

