const { src, dest, watch, parallel } = require('gulp'); // Importar gulp

// CSS - SASS
const sass = require('gulp-sass')(require('sass')); // Importar gulp-sass
const plumber = require('gulp-plumber'); // Importar gulp-plumber

//Imagenes
const cache = require('gulp-cache'); // Importar gulp-cache
const imagemin = require('gulp-imagemin'); // Importar gulp-imagemin
const webp = require('gulp-webp'); // Importar gulp-webp
const avif = require('gulp-avif'); // Importar gulp-avif

function css(done){

    // 1. Identificar archivo SASS
    // 2. Compilar archivo SASS
    // 3. Almacenar archivo

    src('src/scss/**/*.scss') // Indicamos la ruta del archivo
        .pipe( plumber()) // Ejecutamos plumber
        .pipe( sass() ) // Compilamos el archivo SASS
        .pipe( dest('build/css') ); // Almacenamos el archivo en la carpeta build/css

    done(); // Callback que indica que la tarea ha terminado
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'));
    
    done();
}

function versionWebp(done){

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') // Indicamos la ruta del archivo
        .pipe(webp(opciones))
        .pipe(dest('build/img'));

    done();
}

function versionAvif(done){

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') // Indicamos la ruta del archivo
        .pipe(avif(opciones))
        .pipe(dest('build/img'));

    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'));

    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css) // Indicamos la ruta del archivo a observar y la tarea a ejecutar
    watch("src/js/**/*.js", javascript) // Indicamos la ruta del archivo a observar y la tarea a ejecutar
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);