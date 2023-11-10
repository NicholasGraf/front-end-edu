export class Components {
  constructor() {
    this.components = new Map();
  }
  add(selector, classObject) {
    if (this.components.has(selector)) {
      return;
    }
    let componentValues = this.components.values();
    for (let val of componentValues) {
      if (val == classObject) {
        return;
      }
    }
    this.components.set(selector, classObject);
    customElements.define(selector, classObject);
  }
}
