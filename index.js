"use strict"

const rolledBackAfterSuccess = {}

function trex(connection, testFn) {
  return function trex(...libArgs) {
    return connection
      .transaction(trx => {
        try {
          testFn(trx, ...libArgs).tap(
            () => trx.rollback(rolledBackAfterSuccess),
            trx.rollback
          )
        } catch (error) {
          trx.rollback(error)
        }
      })
      .catch(e => {
        if (e !== rolledBackAfterSuccess) console.error(e)
      })
  }
}

module.exports = trex
