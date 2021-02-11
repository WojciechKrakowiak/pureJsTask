import router from 'router/router';

class Controller {
  $refresh: () => void;
  $on(selector: string, event: string, handler: (e: Event) => void) {
    router.events.push([selector, event, handler]);
  }
  props: { [key: string]: string | number } = {};
  head: {
    title: string;
  } = {
    title: '',
  };

  componentWillMount() {
    return true;
  }

  componentDidMount() {
    return;
  }

  constructor(listeners: { (): void }[]) {
    this.$refresh = () => listeners.forEach((fn) => fn());
  }
}

export default Controller;
