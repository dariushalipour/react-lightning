/* global window */
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()
window._history = history
export default history
