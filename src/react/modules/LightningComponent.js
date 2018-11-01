import React from 'react'
import store from '../../store'

class LightningComponent extends React.Component {
  static publishOnStore(publishMap) {
    store.publish(publishMap)
  }

  constructor(props, ctx) {
    super(props, ctx)
    if (!this.state) this.state = {}

    this.takeUntilPromise = new Promise(done => {
      this._unsubscribe = done
    })

    this._setStatus(0)
    this._constructStoreBindings()
    this._bindToStore()
  }

  componentDidMount() {
    this._setStatus(1)
    this._bindToStore()
  }

  componentWillUnmount() {
    this._setStatus(2)
    this._unsubscribe()
    this.constructor._exclusiveSources.forEach(i => store.remove(i))
  }

  _setStatus = status => {
    this._lightning_component_status = status
  }

  _getStatus = () => this._lightning_component_status

  _constructStoreBindings = () => {
    const { storeBindings } = this.constructor

    this.constructor._exclusiveSources = []

    if (!storeBindings) {
      this.constructor._storeBindings = []
      return
    }

    if (this.constructor._storeBindings) return

    const bindingEntries = Object.entries(storeBindings)
    const _storeBindings = bindingEntries.map(binding => {
      const [stateKey, options] = binding
      const { source, modifier = (value => value), exclusive = false } = options

      if (exclusive) this.constructor._exclusiveSources.push(source)

      const callback = function onNext(value) {
        const finalValue = modifier(value)
        const status = this._getStatus()
        if (status === 1) this.setState({ [stateKey]: finalValue })
        else if (status === 0) this.state[stateKey] = finalValue
      }
      return [source, callback]
    })

    this.constructor._storeBindings = _storeBindings
  }

  _bindToStore = () => {
    if (!this.constructor._storeBindings) return
    if (this._storeSubscription && !this._storeSubscription.closed) return
    const bindings = this.constructor._storeBindings
      .map(([key, cb]) => [key, cb.bind(this)])
    this._storeSubscription = store.consume(bindings, this.takeUntilPromise)
  }
}

export default LightningComponent
