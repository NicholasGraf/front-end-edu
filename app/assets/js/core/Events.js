export class Events {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(event, subscriber) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event).push(subscriber);
  }

  unsubscribe(event, subscriber) {
    if (!this.subscribers.has(event)) {
      return;
    }
    let eventObj = this.subscribers.get(event),
      index = eventObj.indexOf(subscriber);
    if (index > -1) {
      eventObj.splice(index, 1);
    }
    if (eventObj.length < 1) {
      this.subscribers.delete(event);
    }
  }

  notify(event, data) {
    if (this.subscribers.has(event)) {
      for (let subscriber of this.subscribers.get(event)) {
        subscriber.update(data);
      }
    }
  }
}
