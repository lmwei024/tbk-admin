import axios from 'axios';
import qs from 'qs';
import NProgress from 'nprogress';
import { Notification } from 'element-ui';
import 'nprogress/nprogress.css';
import router from '../router';
import { getToken, removeToken } from '../utils/auth';

const instance = axios.create({
  baseURL: 'api',
  timeout: 10000,
  auth: {
    username: getToken() || '',
    password: '',
  },
});

instance.transformRequest = [(data, header) => {
  if (!header['Content-Type']) {
    return qs.stringify(data);
  }
  return data;
}];

instance.interceptors.request.use((config) => {
  const token = getToken();
  NProgress.start();
  if (token) {
    config.auth.username = token; // eslint-disable-line
  }
  return config;
}, error => Promise.reject(error));

instance.interceptors.response.use((response) => {
  NProgress.done();
  return response.data;
}, (error) => {
  if (!error.response) {
    Notification({
      title: '警告',
      message: error.message,
      type: 'warning',
    });
    return;
  }
  switch (error.response.status) {
    case 401:
      removeToken();
      router.push({
        name: 'login',
      });
      break;
    default:
      Notification({
        title: '警告',
        message: `${error.response.status}错误,请联系管理员`,
        type: 'warning',
      });
      break;
  }
});

export default instance;
