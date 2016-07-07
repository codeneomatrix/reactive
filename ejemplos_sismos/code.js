var QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/'+'summary/all_day.geojsonp';

//para cargar el archivo lo agregamos al head de forma dinamica
function loadJSONP(url){ 
    var script = document.createElement('script');
    script.src = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
  }

//obtenemos los datos en un observable
var quakes = Rx.Observable
//.interval(5000);
              .create(function(observer) {
                window.eqfeed_callback =function(response) {
                  var quakes = response.features;
                  quakes.forEach(function(quake) {
                    observer.onNext(quake);
                  });
                };
                loadJSONP(QUAKE_URL);
              });


//realizamos operaciones sobre los datos mediate un observador
quakes.subscribe(function(quake) {
  var coords = quake.geometry.coordinates;
  var size = quake.properties.mag * 10;
  //colocamos cada sismo en el mapa con un circulo
  L.circle([coords[1], coords[0]], size).addTo(map);
});
