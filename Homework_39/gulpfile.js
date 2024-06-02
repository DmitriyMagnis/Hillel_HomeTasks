import rollupTypescript from '@rollup/plugin-typescript';
import bs from 'browser-sync';
import { deleteAsync } from 'del';
import { dest, parallel, series, src, watch } from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import htmlmin from 'gulp-htmlmin';
import imagemin, { mozjpeg, optipng } from 'gulp-imagemin';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import ssi from 'gulp-ssi';
import uglify from 'gulp-uglify';
import * as rollup from 'rollup';
import dartSass from 'sass';

const browserSync = bs.create();

const APP_FOLDER = './src/';
const SCCS_FOLDER = './src/styles/';
const IMAGES_FOLDER = './src/images/';
const BUILD_IMAGES_FOLDER = './build/images/';
const BUILD_FOLDER = './build/';
const SOURCE_MAPS = 'map/';

const html = () => {
  return src(`${APP_FOLDER}**.html`)
    .pipe(ssi())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(`${BUILD_FOLDER}`));
};

const clean = series(() => deleteAsync([BUILD_FOLDER]));

const sass = gulpSass(dartSass);

const styles = () => {
  return src(`${SCCS_FOLDER}*.scss`)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(concat('styles.min.css'))
    .pipe(sourcemaps.write(SOURCE_MAPS))
    .pipe(dest(BUILD_FOLDER));
};

const images = () => {
  return src(`${IMAGES_FOLDER}**.{jpg,jpeg,png,svg}`, { encoding: false })
    .pipe(
      imagemin(
        [
          mozjpeg({ quality: 75, progressive: true }),
          optipng({ optimizationLevel: 5 }),
        ],
        { verbose: true }
      )
    )
    .pipe(dest(BUILD_IMAGES_FOLDER));
};

const typescript = async () => {
  const bundle = await rollup.rollup({
    input: `${APP_FOLDER}index.ts`,
    plugins: [rollupTypescript()],
  });

  await bundle
    .write({
      file: `${BUILD_FOLDER}main.js`,
      format: 'es',
      name: 'main',
      sourcemap: true,
    })
    //rollup preventing BrowserSyncEvent resolving in sequence...
    .then(() => {
      browserSync.reload();
    });
};

const optimiseJs = () => {
  return src(`${BUILD_FOLDER}**.js`).pipe(uglify()).pipe(dest(BUILD_FOLDER));
};

const watchers = () => {
  browserSync.init({
    server: {
      baseDir: BUILD_FOLDER,
    },
    open: 'local',
    browser: ['firefox', 'chrome'],
    codeSync: false,
  });
  watch(`${APP_FOLDER}**.html`, html).on('change', browserSync.reload);
  watch(`${IMAGES_FOLDER}**.{jpg,jpeg,png,svg}`, images).on(
    'change',
    browserSync.reload
  );
  watch(`${SCCS_FOLDER}**.scss`, styles).on('change', browserSync.reload);
  watch(`${APP_FOLDER}**/*.ts`, typescript);
};

const build = series(html, styles, images, typescript);
const optBuild = series(
  clean,
  parallel(html, styles, images),
  series(typescript, optimiseJs)
);

export { build, optBuild };
export default series(build, watchers);
