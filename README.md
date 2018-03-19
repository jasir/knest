# Trex

Enable rollback for your tests that use **knex**.

Trex works with most test frameworks out there.


# Installation

`npm install knex --save-dev`


# Usage

> Example using mocha as the testing framework

```js
// user.spec.js
const knex = require('knex')({...knexConfig})
const trex = require('trex').bind(null, knex)
const assert = require('assert')
const {createUser, countUser} = require('./user')

describe('User', () => {
  it('should insert a new user record', trex((trx) => {
    const user = {
      name: "Tom",
      email: tom@example.com
    }

    return createUser(trx, user)
    .then(() => {
      return countUser(trx, user)
    })
    .then(count => assert.equal(count, 1))
  }))

  it('should insert a new user record', trex((trx) => {
    const user = {
      name: "Jerry",
      email: jerry@example.com
    }

    return createUser(trx, user)
    .then(() => {
      return countUser(trx, user)
    })
    .then(count => assert.equal(count, 1))
  }))
})
```

Assuming that mocha and trex are installed and knex is correctly configured, we can
run these tests with the following command:

`mocha ./user.spec.js`

Notice that count stays 1. That's because the first test is run within
a transaction that is rolled back after the test has completed.


# Reference

Trex exports a single function.

## trex(knexConnection, testFn)

What trex basically does is wrap the test function and adds a knex transaction as
the first argument of the test callback function.

**returns** a function that expects the test frameworks test function
arguments.

### knexConnection

This value should be a [knex-connection](http://knexjs.org/#Installation-client).

### testFn(knexTransaction, [...testFnArgs])

The testFn is called when the tests are run. It is called with the following
arguments:

**knexTransaction** is an instance of a knex transaction that uses the
previously configured knex connection.

**[...testFnArgs]** are the optional arguments that are the test framework's
test fn args.

**returns** a promise which will rollback the transaction when it resolves.
This is required. Throws if a promise is not returned.

# Test

Trex is tested using MySQL. Make sure you have MySQL installed. The
`./setup.sql` file makes it easy to setup a database and user for running the
tests.

```bash
npm install
sudo mysql -p < ./setup.sql
npm test
```

# Contribute

Some suggestions for contributing to this library are:

- Use this library for your knex related tests.
- Write tests that use different test frameworks.
- Write tests for other databases knex supports.
- Contribute what you feel is important.
