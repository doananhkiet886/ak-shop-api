'use strict'

const redis = require('redis')
const { promisify } = require('util')
const { reservationInventory } = require('../models/repositories/inventoryRepo')
const redisClient = redis.createClient()

const pExpire = promisify(redisClient.pExpire).bind(redisClient)
const setNXAsync = promisify(redisClient.setNX).bind(redisClient)
const acquireLock = async (productId, quantity, cartId) => {
  const RETRY_TIMES = 10
  const EXPIRE_TIME = 3000 // 3 seconds tam lock
  const key = `lock_v2023_${productId}`

  for (let i = 0; i < RETRY_TIMES;i++) {
    // tao 1 key, ai nam giu duoc vao thanh toan
    const result = await setNXAsync(key, EXPIRE_TIME)
    console.log('result:::', result)
    if (result === 1) {
      // thao tac voi inventory
      const isReservation = await reservationInventory({ productId, quantity, cartId })
      if (isReservation.modifiedCount) {
        await pExpire(key, EXPIRE_TIME)
        return key
      }
      return null
    }
    await new Promise(resolve => setTimeout(resolve, 50))
  }
}

const releaseLock = async keyLock => {
  const delAsyncKey = promisify(redisClient.del).bind(redisClient)
  return await delAsyncKey(keyLock)
}

module.exports = {
  acquireLock,
  releaseLock
}