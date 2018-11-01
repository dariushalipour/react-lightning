import { BehaviorSubject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

class Store {
  constructor(initialState = {}) {
    this.state = {}
    Object.entries(initialState)
      .forEach(pair => this.createSubject(...pair))
  }

  createSubject(key, initialValue) {
    const subject = new BehaviorSubject(initialValue)
    this.state[key] = subject
    return subject
  }

  getSubject(key) {
    return this.state[key]
  }

  publish(publishMap) {
    Object.entries(publishMap).forEach(([key, value]) => {
      const subject = this.getSubject(key)
      if (subject) subject.next(value)
      else this.createSubject(key, value)
    })
  }

  remove(key) {
    this.publish({ [key]: undefined })
  }

  consume(subscriptions, takeUntilPromise) {
    return subscriptions.map(([key, callback]) => {
      let subject = this.getSubject(key)
      if (!subject) subject = this.createSubject(key, undefined)
      if (!takeUntilPromise) return subject.subscribe(callback)
      return subject.pipe(takeUntil(takeUntilPromise)).subscribe(callback)
    }).reduce((acc, other) => acc.add(other))
  }
}

export default Store
