import { client } from '@/utils/client';

const login = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: 'admin', role: 'admin', status: 1, userId: 1, isFirstLogin: 1 });
    }, 1000);
  });
};

const checkLogin = () => {
  // return client({
  //   url: `/v1/user/checkLogin`,
  //   method: 'get',
  // });
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: 'admin', role: 'admin', status: 1, userId: 1 });
    }, 1000);
  });
};

const logout = () =>
  client({
    url: `/v1/user/logout`,
    method: 'get',
  });

export { login, checkLogin, logout };
