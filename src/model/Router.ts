import engine from 'engine/engine';
import Route from 'model/Route';
import Template from 'model/Template';
import Controller from 'model/Controller';

class Router {
  rootElement: HTMLElement = document.getElementById('app');
  events: [string, string, (e: Event) => void][] = [];
  routes: { [path: string]: Route } = {};

  forEachEvent = (fnName: 'addEventListener' | 'removeEventListener') => {
    for (let i = 0; i < this.events.length; i++) {
      const els = this.rootElement.querySelectorAll(this.events[i][0]);
      for (let j = 0; j < els.length; j++) {
        els[j][fnName].apply(els[j], this.events[i].slice(1));
      }
    }
  };

  render = () => {
    //this.forEachEvent('removeEventListener');
    // Clear events, to prepare for next render:
    this.events = [];
    // Current route url (getting rid of '#' in hash as well):
    const url = location.hash.slice(1) || '/';
    // Get route by url or fallback if it does not exist:
    const route = this.routes[url] || this.routes['*'];
    if (route && route.controllerClass) {
      route.init();
      this.forEachEvent('removeEventListener');
      if (!route.controller.componentWillMount()) return;
      document.title = route.controller.head.title;
      this.rootElement.innerHTML = engine.parse(route.template, route.controller);
      // Listen on route refreshes:
      route.onRefresh(() => {
        this.forEachEvent('removeEventListener');
        // Render route template with John Resig's template engine:
        this.rootElement.innerHTML = engine.parse(route.template, route.controller);
        this.forEachEvent('addEventListener');
      });
      route.controller.componentDidMount();
      // Trigger the first refresh:
      route.controller.$refresh();
    }
  };

  add = (path: string, template: Template, controller: typeof Controller) => {
    this.routes[path] = new Route(path, template, controller);
  };
}

export default Router;
