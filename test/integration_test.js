const ElectrumClient = require('../.')

const chai = require('chai')
const assert = chai.assert

const fs = require('fs')

const config = require('./config')

describe('ElectrumClient', async () => {
  let txData

  before(async () => {
    txData = JSON.parse(await fs.readFileSync('./test/tx.json', 'utf8'))
  })

  context('when connected', async () => {
    config.serversArray.forEach((server) => {
      describe(`for ${server.protocol} protocol`, async () => {
        let client

        before(async () => {
          client = new ElectrumClient(
            server.host,
            server.port,
            server.protocol,
            server.options
          )

          await client
            .connect('test_client' + server.protocol, '1.4.2')
            .catch((err) => {
              console.error(
                `failed to connect with config [${JSON.stringify(
                  server
                )}]: [${err}]`
              )
            })
        })

        after(async () => {
          await client.close()
        })

        it('request returns result', async () => {
          const expectedResult = txData.hex
          const result = await client.blockchain_transaction_get(txData.hash)

          assert.equal(result, expectedResult, 'unexpected result')
        })
      })
    })
  })

  context('when not connected', async () => {
    before(async () => {
      const server = config.servers.tcp

      client = new ElectrumClient(
        server.host,
        server.port,
        server.protocol,
        server.options
      )
    })

    it('request throws error', async () => {
      await client.blockchain_transaction_get(txData.hash).then(
        (value) => {
          // onFulfilled
          assert.fail('not failed as expected')
        },
        (reason) => {
          // onRejected
          assert.include(reason.toString(), `connection not established`)
        }
      )
    })
  })
  // TODO: Add tests
})
