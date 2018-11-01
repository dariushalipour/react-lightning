// "prefetch-page-data" module
import * as ROUTE_PATTERNS from '../../constants/routePatterns'
import services from '../../services'
import store from '../../store'

const RP = ROUTE_PATTERNS

const callbacks = {
  [RP.INTERNET_INFO]: async () => {
    const resp = await services.ipService.fetchIpInfo()
    const toPublish = {
      'ip.isp': resp.isp,
      'ip.country': resp.country,
    }
    store.publish(toPublish)
  },
}

function prefetchPageData(pattern, params) {
  const callback = callbacks[pattern]
  if (!callback) return Promise.resolve()
  return callback(params)
}

export default prefetchPageData
