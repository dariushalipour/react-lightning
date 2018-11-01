/* eslint-disable import/prefer-default-export */
import axios from 'axios'

export function fetchIpInfo() {
  return axios.get('http://ip-api.com/json/')
    .then(resp => resp.data)
}
