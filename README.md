# facturapp
## Descripcion
App para contabilizar el coste de las facturas compartidas entre varios inquilinos

## Compatibilidad
Navegadores compatibles con ECMAScript 5
https://caniuse.com/#feat=es5

## Requisitos
Node JS
Npm

## Dependencias
+ vue^2.5.2 (Framework),
+ vue-router^3.0.1 (Enrutador),
+ vue-resource^1.5.0 (Petición de datos),
+ vuex^3.0.1 (Gestión de estado centralizada),
+ vuex-persistedstate^2.4.2 (Cookies),
+ js-cookie^2.2.0 (Cookies),
+ vue-awesome^2.3.4 (Iconos),
+ vue-chartjs^3.1.1 (Gráficas),
+ chart.js^2.7.1 (Gráficas),
+ bootstrap^4.0.0 (Maquetación),
+ bootstrap-vue^2.0.0-rc.2 (Maquetación),
+ lodash^4.17.5 (Utilidades JS),
+ sw-precache-webpack-plugin^0.11.5 (PWA),
+ animate.css^3.5.2 (Animación),
+ html2canvas^1.0.0-alpha.10 (PDF),
+ jspdf^1.3.5 (PDF),
+ jspdf-autotable^2.3.2 (PDF),
+ moment^2.19.3 (Fechas)

## Empezando
1. Instalar GIT https://git-scm.com/download/win
2. Instalar Node JS
    1. https://nodejs.org/en/download/
    2. Windows Installer (Se recomienda instalar dentro una carpeta sin espacios, por ejemplo, C:/dev/)
    3. Desde el cmd comprobar que se han instalado:
        1. $ node -v
        2. $ npm -v
3. Clonar proyecto desde Github a local (https://github.com/jgregorio0/facturapp.git)
4. Abrir con IDE (IntelliJ)
5. Configurar Javascript ECMAScript 6 (Settings/Languages & Frameworks/Javascript/Javascript language version=ECMAScript 6)
6. Desde un terminal (cmd/bash) situarse en la carpeta del proyecto:
    1. $ cd $workspace/facturapp
    2. $ npm install (comprobar que no se producen errores durante la instalación)
    3. $ npm run dev
7. Acceder desde un navegador a localhost:8080

## Build Setup

``` bash
# install dependencies
npm install``

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
## GIFs
```
byzanz-record --duration=25 --x=45 --y=140 --width=650 --height=740 salida.gif
byzanz-record --duration=25 --x=5 --y=170 --width=620 --height=740 salida.gif
```