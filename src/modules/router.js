import matchModule from 'path-match'

export function routePatternsToArray(routePatterns) {
  return Object.values(routePatterns)
    .map(value => {
      const parts = value.split('/')
      let uniqueLen = 0
      for (let i = 0; i < parts.length; i += 1) {
        if (parts[i].indexOf(':') !== 0) continue
        uniqueLen = i
        break
      }
      return { value, uniqueLen }
    })
    .sort((a, b) => b.uniqueLen - a.uniqueLen)
    .map(item => item.value)
}

const createRoute = matchModule({ sensitive: false, strict: false, end: true })
export function parseRoute(pathname, patterns) {
  for (const pattern of patterns) {
    const params = createRoute(pattern)(pathname)
    if (params === false) continue
    return [pattern, params]
  }

  return ['/404', {}]
}
