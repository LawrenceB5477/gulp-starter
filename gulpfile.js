const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

/* STATIC TASKS */

// Move Js files to src js
gulp.task("js", function() {
  return gulp.src(["node_modules/bootstrap/dist/js/bootstrap.min.js",
"node_modules/jquery/dist/jquery.min.js",
"node_modules/popper.js/dist/umd/popper.min.js"])
.pipe(gulp.dest("src/js")).pipe(browserSync.stream());
});

//Move fonts folder to source
gulp.task("fonts", function() {
  return gulp.src("node_modules/font-awesome/fonts/*").pipe(gulp.dest("src/fonts"));
});

//Move font awesome css to source/css
gulp.task("fa", function() {
  return gulp.src("node_modules/font-awesome/css/font-awesome.min.css").pipe(gulp.dest("src/css"));
});


/* DYNAMIC TASKS */
//Compile Sass and Inject into browser
gulp.task("sass", function() {
  console.log("Sass compiling");
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss',
   'src/scss/*.scss'])
  .pipe(sass()).pipe(gulp.dest("src/css"))
  .pipe(browserSync.stream());
});


//Watch sass and server
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./src"
  });

  //if these files change, run sass
  gulp.watch(["node_modules/bootstrap/scss/bootstrap.scss",
   "src/scss/*.scss"], ["sass"]);
   //if html changes, reload the sever
  gulp.watch("src/*.html").on("change", function() {
    console.log("Change");
    browserSync.reload();
  });
});


gulp.task("default", ["js", "serve", "fa", "fonts"]);
