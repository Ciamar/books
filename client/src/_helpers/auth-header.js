export default function authHeader() {
  const token = localStorage.getItem('token');

  if (token) {
    return { headers: { authorization:  token}};
  } else {
    return {};
  }
}
