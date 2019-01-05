import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import NProgress from 'nprogress';
import router from '../router';

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/index' });
      NProgress.done();
      return;
    }
    next();
  } else {
    if (to.meta.nologin) {
      next();
      return;
    }
    next({
      path: '/login',
      // query: { callback: to.fullPath },
    });
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
