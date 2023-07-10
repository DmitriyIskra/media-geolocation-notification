export default class Pattern {
  constructor(moment) {
    this.moment = moment;
  }

  create(type, data) {
    if (type === 'text') {
      const postWrapper = document.createElement('div');
      postWrapper.classList.add('post-wrapper');

      const postDate = document.createElement('div');
      postDate.classList.add('post-date');
      postDate.textContent = `${this.moment().format('DD.MM.YY HH:mm')}`;

      const postText = document.createElement('div');
      postText.classList.add('post-text');
      postText.textContent = data.content;

      const wrGeolocation = document.createElement('div');
      wrGeolocation.classList.add('wr-geolocation');
      const geolocation = document.createElement('div');
      geolocation.textContent = `[${data.coords.latitude}, ${data.coords.longitude}]`;
      const eye = document.createElement('div');
      eye.classList.add('eye');

      wrGeolocation.append(geolocation);
      wrGeolocation.append(eye);

      postWrapper.append(postDate);
      postWrapper.append(postText);
      postWrapper.append(wrGeolocation);

      return postWrapper;
    }
  }
}
