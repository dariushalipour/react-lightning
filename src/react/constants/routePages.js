import * as ROUTE_PATTERNS from '../../constants/routePatterns'
import HelloWorld from '../page/HelloWorld'
import InternetInfo from '../page/InternetInfo'

const RP = ROUTE_PATTERNS

export default {
  [RP.INTERNET_INFO]: InternetInfo,
  [RP.HELLO_WORLD]: HelloWorld,
}
