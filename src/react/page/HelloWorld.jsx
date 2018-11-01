import React from 'react'
import LightningComponent from '../modules/LightningComponent'

class HelloWorld extends LightningComponent {
  render() {
    return (
      <h1>Hello, {this.state.name}!</h1>
    )
  }
}

HelloWorld.storeBindings = {
  name: {
    source: 'history.route.params',
    modifier: ({ name }) => name || 'World',
  },
}

export default HelloWorld
