const distFolder = './dist';
const srcFolder = './src';

export const paths = {
  dist: {
    html: `${distFolder}/`,
    js: `${distFolder}/js/`,
    styles: `${distFolder}/css/`,
    img: `${distFolder}/images/`,
    favicon: `${distFolder}/favicon/`,
    fonts: `${distFolder}/fonts/`,
  },
  src: {
    html: `${srcFolder}/pages/*.html`,
    js: `${srcFolder}/js/app.js`,
    styles: `${srcFolder}/scss/common.scss`,
    img: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,svg,webp}`,
    favicon: `${srcFolder}/favicon/favicon.{png,svg}`,
    fonts: `${srcFolder}/fonts/**/*.*`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    js: `${srcFolder}/js/**/*.js`,
    styles: `${srcFolder}/scss/**/*.scss`,
    favicon: `${srcFolder}/favicon/favicon.{png,svg}`,
    img: `${srcFolder}/images/**/*.{jpg,jpeg,svg,ico,png,gif,webp}`,
  },
  clean: distFolder,
  distFolder: distFolder,
  srcFolder: srcFolder,
};
