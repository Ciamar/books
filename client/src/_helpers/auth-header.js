export default function authHeader() {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    return { Authorization:  token.token };
  } else {
    return {};
  }
}
