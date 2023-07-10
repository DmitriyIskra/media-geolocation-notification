import moment from 'moment-timezone';
import Controll from './controll';
import DrawUI from './drawUI';
import Pattern from './Pattern';
import validation from './validation';

const board = document.querySelector('.board');

const pattern = new Pattern(moment);
const drawUI = new DrawUI(board, pattern, validation);
const controll = new Controll(drawUI);
controll.init();
