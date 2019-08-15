/* eslint no-unused-vars: 0 */

const tcp = {
  protocol: 'tcp', port: '50001', host: 'electrumx-server.tbtc.svc.cluster.local',
}

const ssl = {
  protocol: 'ssl', port: '50002', host: 'testnet1.bauerj.eu',
}


const ws = {
  protocol: 'ws', port: '50003', host: 'electrumx-server.tbtc.svc.cluster.local',
}

const wss = {
  protocol: 'wss', port: '50004', host: 'electrumx-server.tbtc.svc.cluster.local',
}

module.exports = [
  // tcp,
  ssl,
  // ws,
  // wss,
]
