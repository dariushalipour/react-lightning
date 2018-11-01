import React from 'react'
import LightningComponent from '../modules/LightningComponent'
import ROUTE_PAGES from '../constants/routePages'

class App extends LightningComponent {
  render() {
    const PageComponent = ROUTE_PAGES[this.state.routePattern] || (() => <p>404</p>)

    return <PageComponent />
  }
}

App.storeBindings = {
  routePattern: {
    source: 'history.route.pattern',
  },
}

export default App
