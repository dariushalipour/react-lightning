import React from 'react'
import LightningComponent from '../modules/LightningComponent'

class InternetInfo extends LightningComponent {
  render() {
    return (
      <ul>
        <li>ISP: {this.state.isp}</li>
        <li>Country: {this.state.country}</li>
      </ul>
    )
  }
}

InternetInfo.storeBindings = {
  isp: {
    source: 'ip.isp',
    exclusive: true,
  },
  country: {
    source: 'ip.country',
  },
}

export default InternetInfo
