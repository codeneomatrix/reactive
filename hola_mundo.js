var Rx = require('rx');

function imprimir(l){console.log(l);}

var xs=Rx.Observable.just('Hola mundo!');
var d= xs.subscribe(imprimir);


var xs = Rx.Observable.range(1, 9);
var d= xs.filter(function(val) {return val % 2; }).map(function(val) {return val * 10; });
d.subscribe(imprimir)