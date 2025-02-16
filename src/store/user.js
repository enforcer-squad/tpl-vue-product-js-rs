import { defineStore } from 'pinia';
import { ref } from 'vue';
import { checkLogin, login, logout } from '@/services/user';

export const useUserStore = defineStore('user', () => {
  // state
  const name = ref('');
  const role = ref(-1);
  const status = ref(0);
  const userId = ref(0);
  const isFirstLogin = ref(false);

  // actions
  async function check() {
    const res = await checkLogin();
    console.log('res', res);

    name.value = res.name;
    role.value = res.role;
    status.value = res.status;
    userId.value = res.userId;
  }

  async function doLogin(data) {
    try {
      const res = await login(data);
      name.value = res.name;
      role.value = res.role;
      status.value = res.status;
      userId.value = res.userId;
      isFirstLogin.value = res.isFirstLogin;
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async function doLogout() {
    await logout();
    name.value = '';
    role.value = 0;
    status.value = 0;
    userId.value = 0;
    isFirstLogin.value = false;
  }

  return {
    // state
    name,
    role,
    status,
    userId,
    isFirstLogin,
    // actions
    check,
    doLogin,
    doLogout,
  };
});
