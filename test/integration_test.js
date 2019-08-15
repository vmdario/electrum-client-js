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

  describe('for all protocols', async () => {
    configs.forEach((config) => {
      let client

      before(async () => {
        client = new ElectrumClient(config.host, config.port, config.protocol, config.options)

        await client.connect('test_client' + config.protocol, '1.4.2')
          .catch((err) => {
            console.error(`failed to connect with config [${JSON.stringify(config)}]: [${err}]`)
          })
      })

      after(async () => {
        await client.close()
      })

      it('request returns result', async () => {
        const expoectedResult = txData.hex
        const result = await client.blockchain_transaction_get(txData.hash)

        assert.equal(
          result,
          expoectedResult,
          'unexpected result',
        )
      })
    })
  })

  describe('when not connected', async () => {
    before(async () => {
      const config = configs[0]

      client = new ElectrumClient(config.host, config.port, config.protocol, config.options)
    })

    it('request throws error', async () => {
      await client.blockchain_transaction_get(txData.hash)
        .then(
          (value) => { // onFulfilled
            assert.fail('not failed as expected')
          },
          (reason) => { // onRejected
            assert.include(reason.toString(), `connection not established`)
          }
        )
    })
  })
  // TODO: Add tests
})
