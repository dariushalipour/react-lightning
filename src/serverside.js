import '@babel/polyfill'
import path from 'path'
import express from 'express'
import { renderToString } from 'react-dom/server'
import prefetchPageData from './modules/prefetchPageData'
import renderFullPage from './modules/renderFullPage'
import rootComponent from './react'
import store from './store'
import * as ROUTE_PATTERNS from './constants/routePatterns'
import { routePatternsToArray, parseRoute } from './modules/router'

const routePatterns = routePatternsToArray(ROUTE_PATTERNS)

function handleRender(req, res) {
  const [pattern, params] = parseRoute(req.originalUrl, routePatterns)

  store.publish({
    'history.route.pattern': pattern,
    'history.route.params': params,
    'history.location.pathname': req.originalUrl,
  })

  prefetchPageData(pattern, params)
    .then(() => {
      const component = rootComponent()
      const html = renderToString(component)
      const body = renderFullPage(html, {})
      res.send(body)
    })
}

const port = 3000
const app = express()

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(handleRender)
app.listen(port)
