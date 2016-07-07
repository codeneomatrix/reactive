using Reactive

#m=filter(a -> a % 2 == 0, x)
#d = merge(a,b,c)

x = Signal(0)

xsquared = map(a -> a*a, x)

y = map(+, x, xsquared)

value(y) 

push!(x, 4)
value(y)  #y= 4 + (4*4)