import Cookies from 'js-cookie';

const TokenKey = 'Frontend-Token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token, ops, id) {
  return Cookies.set(TokenKey, token, ops, id);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
