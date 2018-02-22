'use strict';

/* automatizar tareas mediante Gulp */

/*
* Dependencias o imports
*/
/* variables de las librerias que instalamos con npm */
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
const babel = require('gulp-babel');

/*
* Tareas
*/

//concatenar es el nombre de la tarea
gulp.task('concatenar', function() {
  return gulp.src('./src/html/*.html')//origen de los ficheros
    .pipe(concat('index.html')) //fichero destino
    .pipe(gulp.dest('./dist/')); //carpeta destino
});

//tarea de Sass para convertir de Sass a CSS
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'));
});


gulp.task('es6toes5', () =>
    gulp.src('./src/js/main.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./dist/js/'))
);


gulp.task('move', function(){

    gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/js/'));

});


/* definir tarea por defecto tienes que tener en el cmd abierto y lanzar gulp */

//Default task (tarea).
gulp.task('default',function(){

    gulp.watch('src/**/*.*',['concatenar','sass','move']);
});
