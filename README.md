Statically instrument your source files with [Blanket](https://github.com/alex-seville/blanket).

```javascript

const gulp = require('gulp')
const instrument = require('gulp-blanket-instrument')
...
gulp.task('instrument', () => {
  return gulp.src(files).pipe(instrument()).pipe(gulp.dest(dest));
})
```

When you instrument your files statically, Blanket will not be aware of them.
Remove any dynamic `data-cover` annotations you may have and add the following snippet
to your test runner, after Blanket has loaded but before it (Mocha) has run:

```javascript
// if we have statically instrumented files, make Blanket recognize them
if (window._$jscoverage) {
  window._$blanket = _$jscoverage;
}
```

You may have to take advantage of the Blanket `testReadyCallback` option to ensure
this assignment occurs before the test run kicks off (or it may just happen to work
OOTB).  YMMV.
