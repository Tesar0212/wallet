import gulp from 'gulp';
import { paths } from '../config/path.js';
import { html } from './html.js';
import { images } from './images.js';
import { js } from './js.js';
import { styles } from './styles.js';

const { watch } = gulp;

export function watcher() {
  watch(paths.watch.html, html);
  watch(paths.watch.styles, styles);
  watch(paths.watch.js, js);
  watch(paths.watch.img, images);
}
