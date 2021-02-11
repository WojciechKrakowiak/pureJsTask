import Controller from 'model/Controller';
import { clearSession, getSession } from 'functions/session';
import { navigate } from 'functions/navigate';

class SuccessController extends Controller {
  props = {
    welcomeMessage: '',
    logoutButton: 'Logout',
  };

  loginData = {
    username: '',
    token: '',
  };

  head = {
    title: 'Success | Łubudu',
  };

  componentWillMount() {
    const [username, token, welcomeMessage] = getSession();
    if (!username || !token) {
      navigate('/');
      return false;
    }
    this.loginData = {
      username: username,
      token: token,
    };
    this.props.welcomeMessage = welcomeMessage;
    return true;
  }

  componentDidMount() {
    this.$on('#logoutButton', 'click', (e) => {
      e.preventDefault();
      clearSession();
      navigate('/');
    });
  }
}

export default SuccessController;
