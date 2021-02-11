import Controller from 'model/Controller';
import { getSession, saveSession } from 'functions/session';
import { navigate } from 'functions/navigate';

import userIcon from 'icons/user.svg';
import passwordIcon from 'icons/password.svg';
import getIcon from 'functions/getIcon';

class HomeController extends Controller {
  props = {
    title: 'Łubudu!',
    submit: 'Login',
    username: 'Username',
    password: 'Password',
    usernameIcon: getIcon(userIcon, 'input__icon'),
    passwordIcon: getIcon(passwordIcon, 'input__icon'),
    error: '',
  };

  cache = {
    username: '',
    password: '',
  };

  head = {
    title: 'Login | Łubudu',
  };

  loadCache() {
    const loginForm = document.getElementById('loginForm');
    loginForm.querySelector<HTMLInputElement>('input[name=username]').value = this.cache.username;
    loginForm.querySelector<HTMLInputElement>('input[name=password]').value = this.cache.password;
  }

  componentWillMount() {
    const [username, token] = getSession();
    if (username && token) {
      navigate('/success');
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.$on('#loginForm', 'submit', (e) => {
      e.preventDefault();
      const loginForm = document.getElementById('loginForm');
      const usernameInput = loginForm.querySelector<HTMLInputElement>('input[name=username]');
      const passwordInput = loginForm.querySelector<HTMLInputElement>('input[name=password]');
      const submitButton = loginForm.querySelector<HTMLButtonElement>('#submitButton');
      const username = usernameInput.value;
      const password = passwordInput.value;

      this.cache.username = username;
      this.cache.password = password;

      if (!username || !password) {
        this.props.error = 'Error: Please fill all fields.';
        this.$refresh();
        this.loadCache();
        return;
      }
      submitButton.classList.add('button--loading');
      fetch('https://zwzt-zadanie.netlify.app/api/login', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.message);
          } else if (data.token.length) {
            saveSession(username, data.token, data.message);
            navigate('/success');
          }
        })
        .catch((err) => {
          this.props.error = err;
          this.$refresh();
          this.loadCache();
        });
    });
  }
}

export default HomeController;
