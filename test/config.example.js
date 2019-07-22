module.exports = {
  withoutCredentials: {
    address: '123.123.123.123',
    port: 1001,
    _expectedAddress: '123.123.123.123'
  },
  withCredentials: {
    address: '123.123.123.123',
    port: 1000,
    credentials: {
      username: 'user',
      password: 'password'
    },
    _expectedAddress: '123.123.123.123'
  }
}
