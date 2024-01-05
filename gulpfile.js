const { src, dest, watch } = require('gulp'); // Importar gulp
const sass = require('gulp-sass')(require('sass')); // Importar gulp-sass
const plumber = require('gulp-plumber'); // Importar gulp-plumber

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

function dev(done){
    watch("src/scss/**/*.scss", css) // Indicamos la ruta del archivo a observar y la tarea a ejecutar
    done();
}

exports.css = css;
exports.dev = dev;