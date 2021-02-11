export const saveSession = (username: string, token: string, welcomeMessage: string) => {
  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
  localStorage.setItem('welcomeMessage', welcomeMessage);
};

export const clearSession = () => saveSession('', '', '');

export const getSession = () => {
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const welcomeMessage = localStorage.getItem('welcomeMessage');
  return [username, token, welcomeMessage];
};
