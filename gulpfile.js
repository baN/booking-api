var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function(){
  nodemon({
    script: 'app.js', //run this
    ext: 'js', //watch this
    env: {  //custom json setup
      PORT: 8000
    },
    ignore: ['./node_modules/**'] //everytime we install node module, don't run
  })
  .on('restart', function(){
    console.log('Restarting...')
  });
});