import Controll from './controll';
import DrawUI from './drawUI';
import Pattern from './Pattern';
import validation from './validation';

import moment from 'moment-timezone';

const board = document.querySelector('.board');

const pattern = new Pattern(moment);
const drawUI = new DrawUI(board, pattern, validation);
const controll = new Controll(drawUI);
controll.init();
