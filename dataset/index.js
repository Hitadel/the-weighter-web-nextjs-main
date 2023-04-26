import importAll from 'import-all.macro';
import { toPairs } from 'lodash';
import down01 from './down/01.jpg';
import down02 from './down/02.jpg';
import down03 from './down/03.jpg';
import down04 from './down/04.jpg';
import down05 from './down/05.jpg';
import up01 from './up/01.jpg';
import up02 from './up/02.jpg';
import up03 from './up/03.jpg';
import up04 from './up/04.jpg';
import up05 from './up/05.jpg';

const downPaths = toPairs([down01, down02, down03, down04, down05]);
const upPaths = toPairs([up01, up02, up03, up04, up05]);

export const imagePaths = [
  ...downPaths.map(([_, path]) => path),
  ...upPaths.map(([_, path]) => path),
];
export const imageCategories = [
  ...downPaths.map(_ => 'down'),
  ...upPaths.map(_ => 'up'),
];
