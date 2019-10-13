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

drawlimits
----------
Dibuja los límites del dibujo (que se establecen con xlimits e ylimits).

    drawlimits();

drawaxes
--------
Dibuja los ejes de coordenadas, en color rojo el eje x (horizontal) y en color verde el eje y (vertical).

    drawaxes();

xlimits
-------
Establece los límites del dibujo en la dirección horizontal.

    xlimits(XMIN, XMAX);

Ejemplo:

    xlimits(-500, 1200);

Los límites por defecto en la dirección horizontal son (-1000, 1000).

ylimits
-------
Establece los límites del dibujo en la dirección vertical.

    ylimits(YMIN, YMAX);

Ejemplo:

    ylimits(-1500, 2100);

Los límites por defecto en la dirección vertical son (-1000, 1000).

redraw
------
Solicita el redibujado, dentro de la función de animación draw().

    redraw();

Ejemplo:

    let x = -500;
    function draw() {
        circle (x, 0, 100);
        x = x + 10;
        if (x < 500)
            redraw();
    }

deltatime
---------
Devuelve el tiempo (en segundos) que se tardó en dibujar el fotograma anterior. Función pensada para llamar en el interior de la función draw().

    let t = deltatime();

Ejemplo:

    let x = 0;
    function draw() {
        circle(x, 0, 50);
        x = x + 100 * deltatime();
        redraw();
    }

