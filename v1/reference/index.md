Referencia de comandos de EZDraw
================================

clear
-----
Borra la pantalla y la rellena con el color indicado.

    clear(COLOR);

circle
------
Dibuja un círculo con centro en el punto (X, Y) y con un radio de R unidades.

    circle(X, Y, R);

line
----

Dibuja una línea entre el punto (X1, Y1) y otro punto (X2, Y2).

    line(X1, Y1, X2, Y2);

rect
----
Dibuja un rectángulo (alineado con los ejes) especificando una esquina (X1, Y1) y la esquina opuesta (X2, Y2)

    rect(X1, Y1, X2, Y2);

polyline
--------
Dibuja una polilínea (múltiples segmentos de línea) entre los puntos (X1, Y1), (X2, Y2)... hasta (XN, YN).

    polyline([X1, Y1, X2, Y2, ... , XN, YN]);

polygon
-------
Dibuja un polígono cerrado que pasa por los puntos (X1, Y1), (X2, Y2)... hasta (XN, YN).

    polygon([X1, Y1, X2, Y2, ... , XN, YN]);

cómo especificar colores
------------------------
Se pueden especificar colores igual que se hace con el canvas de HTML:
- Por nombre ('red', 'green', 'blue', 'chartreuse', 'tomato' ... )
- Por valor hexadecimal corto('#FC0', '#A92') o largo ('#A90923', '#F8CE47')
- Por componentes RGB ('rgb(255,191,127)', 'rgb(0,80,0) ... )

linewidth
---------
Especifica el grosor de línea en unidades del dibujo, para comandos de dibujo posteriores.

    linewidth(10);

Afecta a los siguientes comandos posteriores:
- line
- polyline
- circle (contorno)
- rect (contorno)
- polygon (contorno)

linecolor
---------
Especifica el color de línea para comandos posteriores de dibujo.

    linecolor("#FC0");

Para no dibujar línea, se puede especificar el valor null.

    linecolor(null);

Afecta a los siguientes comandos posteriores:
- line
- polyline
- circle (contorno)
- rect (contorno)
- polygon (contorno)

fillcolor
---------
Especifica el color de relleno para comandos posteriores de dibujo.

    fillcolor("#FC0");

Para no dibujar relleno, se puede especificar el valor null.

    fillcolor(null);

Afecta a los siguientes comandos posteriores:
- circle (relleno)
- rect (relleno)
- polygon (relleno)

---
---
---
---


comandos
- clear       
- xrange      
- yrange      
- linewidth   
- linecolor   
- fillcolor   
- line        
- rect        
- circle      
- polyline    
- polygon     
- drawlimites 
- drawaxes    
- redraw      