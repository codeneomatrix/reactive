import rx
from rx import Observer ,Observable


class observer(Observer):
    def on_next(self, x):
        print("valor de x: %s" % x)
        
    def on_error(self, e):
        print("Error: %s" % e)
        
    def on_completed(self):
        print("Recorrido completado")
def f(x):
	print("=>: %s" % x)

def f2(x):
	print(x)

#---------------hola mundo-------------------------------------
h = Observable.from_iterable("hola mundo reactivo")
p = h.reduce(
        lambda x, y: x + y
    ).subscribe(f2)
#------------------------------------
xs = Observable.from_iterable(range(10))
d = xs.subscribe(observer()) #imprime todos los valores del 1..10

d = xs.map(
        lambda x: x * 2
    ).subscribe(observer())

d = xs.filter(
         lambda x: x % 2
     ).subscribe(observer())  #imprime solo los valores impares



#para fusionar dos flujos de datos distintos
xs = Observable.range(1, 5)
ys = Observable.from_("abcde")
zs = xs.merge(ys).subscribe(observer())


#--------------------------------------------------------
#los sujetos son observadores y observables al mismo tiempo
from rx.subjects import Subject
def f(x):
	print("=>: %s" % x)

flujo = Subject()
flujo.on_next(41)

d = flujo.subscribe(f)

flujo.on_next(42)

d.dispose()
flujo.on_next(43)

