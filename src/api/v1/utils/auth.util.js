'use strict'

const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const createKeyPairRsa = () => {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  })
}

const createTokenPair = ({ payload = { userId: '', username: '' }, privateKey, accessTokenExpiresIn = '1 days', refreshTokenExpiresIn = '2 days' }) => {
  const accessToken = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: accessTokenExpiresIn
  })

  const refreshToken = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: refreshTokenExpiresIn
  })

  return { accessToken, refreshToken }
}

module.exports = {
  createKeyPairRsa,
  createTokenPair
}