import Controller from 'model/Controller';
import Template from 'model/Template';

class Route {
  controller: Controller;
  controllerClass: typeof Controller;
  listeners: { (): void }[] = [];
  template: Template;
  onRefresh = this.listeners.push.bind(this.listeners);

  constructor(path: string, template: Template, controller: typeof Controller) {
    this.template = template;
    this.controllerClass = controller;
  }

  init = () => {
    this.controller = new this.controllerClass(this.listeners);
  };
}

export default Route;
