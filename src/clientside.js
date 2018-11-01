/* global document */

import '@babel/polyfill'
import ReactDOM from 'react-dom'
import createHashHistory from 'history/createHashHistory'
import store from './store'
import rootComponent from './react'
import * as ROUTE_PATTERNS from './constants/routePatterns'
import prefetchPageData from './modules/prefetchPageData'
import { routePatternsToArray, parseRoute } from './modules/router'

const routePatterns = routePatternsToArray(ROUTE_PATTERNS)
const history = createHashHistory()

function handleHistoryChange(location) {
  const [pattern, params] = parseRoute(location.pathname, routePatterns)
  store.publish({
    'history.route.pattern': pattern,
    'history.route.params': params,
    'history.location.pathname': location.pathname,
  })
  prefetchPageData(pattern, params)
}

history.listen(handleHistoryChange)
handleHistoryChange(history.location)

const rootElem = document.getElementById('root')
rootElem.innerHTML = ''
ReactDOM.render(rootComponent(), rootElem)
