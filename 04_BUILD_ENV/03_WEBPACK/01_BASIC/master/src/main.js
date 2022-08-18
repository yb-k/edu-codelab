import '@/style.css';
import { debug, error, info, log } from '@/logging';

window.onload = function () {
  log('log');
  error('error');
  info('info');
  debug('debug');
}