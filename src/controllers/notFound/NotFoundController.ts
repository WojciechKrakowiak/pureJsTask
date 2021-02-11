import Controller from 'model/Controller';

class NotFoundController extends Controller {
  props = {
    title: '404 not found',
    button: 'Go to homepage',
  };

  head = {
    title: 'Page not found | Łubudu',
  };
}

export default NotFoundController;
