import rollupTypescript from '@rollup/plugin-typescript';
import bs from 'browser-sync';
import { dest, parallel, series, src, watch } from 'gulp';
import clean from 'gulp-clean';
import concat from 'gulp-concat';
import imagemin, { mozjpeg, optipng } from 'gulp-imagemin';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import ssi from 'gulp-ssi';
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
  return src(`${APP_FOLDER}*.html`)
    .pipe(ssi())
    .pipe(dest(`${BUILD_FOLDER}`))
    .pipe(browserSync.stream());
};
const cleanBuildFolder = () => {
  return src(
    [`${BUILD_FOLDER}*.js`, `${BUILD_FOLDER}**.css`, `${BUILD_FOLDER}**.html`],
    { read: false }
  ).pipe(clean());
};

const sass = gulpSass(dartSass);

const styles = () => {
  return src(`${SCCS_FOLDER}*.scss`)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(concat('styles.min.css'))
    .pipe(sourcemaps.write(SOURCE_MAPS))
    .pipe(dest(BUILD_FOLDER))
    .pipe(browserSync.stream());
};

const imagesOptimisation = () => {
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

const connectServer = () => {
  browserSync.init({
    server: {
      baseDir: BUILD_FOLDER,
    },
    open: true,
  });
};

const typescript = async () => {
  return await rollup
    .rollup({
      input: `${APP_FOLDER}index.ts`,
      plugins: [rollupTypescript()],
    })
    .then(bundle => {
      return bundle.write({
        file: `${BUILD_FOLDER}main.js`,
        format: 'es',
        name: 'main',
        sourcemap: true,
      });
    });
};

const watchers = () => {
  watch(`${SCCS_FOLDER}*.scss`, styles);
  watch(`${APP_FOLDER}*.html`, html);
  watch(`${APP_FOLDER}*.ts`, typescript);
};

const build = series(
  cleanBuildFolder,
  html,
  styles,
  imagesOptimisation,
  typescript
);
export { build };
export default series(build, parallel(connectServer, watchers));
