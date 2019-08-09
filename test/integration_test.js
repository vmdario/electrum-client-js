const ElectrumClient = require('../.')

const chai = require('chai')
const assert = chai.assert

const fs = require('fs')

const configs = require('./config')

describe('ElectrumClient', async () => {
  let txData

  before(async () => {
    txData = JSON.parse(await fs.readFileSync('./test/tx.json', 'utf8'))
  })

  configs.forEach((config) => {
    let client

    before(async () => {
      client = new ElectrumClient(config.host, config.port, config.protocol, config.options)

      await client.connect('test_client' + config.protocol, '1.4.2')
        .catch((err) => {
          console.log(err)
        })
    })

    after(async () => {
      await client.close()
    })

    it('blockchain_transaction_get', async () => {
      const expoectedResult = txData.hex
      const result = await client.blockchain_transaction_get(txData.hash)

      assert.equal(
        result,
        expoectedResult,
        'unexpected result',
      )
    })
  })

  // TODO: Add tests
})
