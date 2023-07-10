export default class DrawUI {
  constructor(board, pattern, validation) {
    this.board = board;
    this.messages = this.board.querySelector('.messages');
    this.pattern = pattern;
    this.validation = validation;

    this.form = this.board.querySelector('.form');
    this.input = this.form.input;

    this.modal = this.board.querySelector('.modal');
    this.modalForm = this.board.querySelector('.modal-form');
    this.modalInput = this.modalForm.inputGeo;

    this.modalSubmit = this.modalSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // это маркер какой тип тикета добавлен
    this.typeMessage = null;
  }

  // Если координаты доступны, получаем координаты, вызываем addText если маркер текст

  // Работа начинается с initModal -> modalSubmit или getGeolocation

  addText(data) {
    const pattern = this.pattern.create('text', data);

    this.messages.prepend(pattern);

    this.form.reset();
  }

  addVideo() {

  }

  addAudio() {

  }

  getPattern(type, data) {
    return this.pattern.create(type, data);
  }

  getGeolocation(mark) {
    navigator.geolocation.getCurrentPosition((event) => {
      if (mark === 'text') {
        const { latitude, longitude } = event.coords;

        const text = this.input.value;

        const data = {
          content: text,
          coords: { latitude, longitude },
        };

        this.addText(data);
      }
    }, (error) => {
      if ((error.PERMISSION_DENIED || error.POSITION_UNAVAILABLE) && mark === 'text') {
        const text = this.input.value;

        const data = {
          content: text,
          coords: { latitude: '- - - -', longitude: '- - - -' },
        };

        this.addText(data);
      }
    });
  }

  initModal(mark) {
    // открываем окно
    this.modal.classList.remove('unactive-modal');
    // маркер для определения типа сообщения, какой метод добавления в итоге вызвать
    this.typeMessage = mark;
    // навешиваем события единожды {once: true}
    this.modalForm.addEventListener('submit', this.modalSubmit, { once: true });
    this.modalForm.addEventListener('reset', this.closeModal, { once: true });
  }

  closeModal() {
    this.form.reset();
    this.modal.classList.add('unactive-modal');
  }

  modalSubmit(e) {
    e.preventDefault();
    console.log('work');
    // получаем введенные данные
    const coordsModal = this.modalInput.value;

    // отправляем данные на валидацию
    const resultValidation = this.validation(coordsModal);

    // в соответствии с валидацией что-то делаем
    if (!resultValidation) {
      // назначаем свой текст на invalid в элементе
      this.modalInput.setCustomValidity('не верный формат, проверьте введенные данные на соответствие формату');
      // вызываем текст ошибки
      this.modalForm.reportValidity();

      // на поле ввода навешиваем событие, если пользователь начнет исправлять ошибку
      // если не начнет ничего сделать не получиттся только сбросить
      this.modalInput.addEventListener('input', () => {
        // если была попытка исправить снова навешиваем submit чтоб была возможность попытаться отправить
        this.modalForm.addEventListener('submit', this.modalSubmit, { once: true });
        // сбрасываем кастумную ошибку
        this.modalInput.setCustomValidity('');
      }, { once: true });
      return;
    }

    // формируем массив в нужном формате
    const arr = coordsModal.split('');
    let arrFiltered = arr.filter((item) => item !== '[')
      .filter((item) => item !== ']')
      .filter((item) => item !== ',');

    // Итог массив типа ['123456', '123456']
    arrFiltered = arrFiltered.join('').split(' ');
    // Получаем данные из поля ввода текста
    const { value } = this.input;

    if (this.typeMessage === 'text') {
      this.addText(
        {
          content: value,
          coords: {
            latitude: arrFiltered[0],
            longitude: arrFiltered[1],
          },
        },
      );
    }

    // сбрасываем форму и закрываем модальное окно
    this.modalForm.reset();

    this.closeModal();
  }

  visibleCoords(elem) {
    elem.classList.toggle('no-visible');
  }
}

// coords:
//     latitude:45.02242660522461
//     longitude:34.08929443359375
