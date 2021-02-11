// Simple JavaScript Templating
// originally by John Resig - https://johnresig.com/ - MIT Licensed

import Controller from 'model/Controller';
import Template from 'model/Template';

class Engine {
  cache: { [key: string]: Function } = {};

  parse = (template: Template, controller: Controller): string => {
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    if (this.cache[template.id] == null) {
      this.cache[template.id] = new Function(
        'props',
        `
        const p=[];
        const {${Object.keys(controller.props).join(',')}} = props;
        p.push(\`
        
        ${template.value
          .replace(/[\r\t\n]/g, ' ')
          .replace(/'/g, '"')
          .split('<%')
          .join('\t')
          .replace(/((^|%>)[^\t]*)'/g, (_, p1) => {
            const propName = p1.replace(/\s/g, '');
            return `typeof ${propName} !== "undefined" ? ${propName} : ""`;
          })
          .replace(/\t=(.*?)%>/g, (_, p1) => {
            const propName = p1.replace(/\s/g, '');
            return `\`,typeof ${propName} !== "undefined" ? ${propName} : "",\``;
          })
          .split('\t')
          .join('`);')
          .split('%>')
          .join('p.push(`')
          .split('\r')
          .join('\\`')}\`);
        return p.join('');
      `,
      );
    }

    return this.cache[template.id](controller.props);
  };
}

const engine = new Engine();

export default engine;
