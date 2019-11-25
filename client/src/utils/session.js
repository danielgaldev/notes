import ax from 'axios';
import { configure } from 'axios-hooks';

const axios = ax.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

configure({axios});

export default axios;
