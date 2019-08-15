/* eslint no-unused-vars: 0 */

const tcp = {
  protocol: 'tcp', port: '50001', host: 'fortress.qtornado.com',
}

const ssl = {
  protocol: 'ssl', port: '50002', host: 'fortress.qtornado.com',
}


const ws = {
  protocol: 'ws', port: '50003', host: 'electrumx-server.tbtc.svc.cluster.local',
}

const wss = {
  protocol: 'wss', port: '50004', host: 'electrumx-server.tbtc.svc.cluster.local',
}

module.exports = [
  tcp,
  ssl,
  // WebSocket is commented out for CI, until we find public servers for this protocol.
  // ws,
  // wss,
]
