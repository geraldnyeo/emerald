from brownie import network, SinglePool, CryptoPool
from scripts.helpers import (
    get_account
)

# I think most functions in the solidity code will have parallels here

# CryptoPool functions
def create_pool(poolName, _open, address):
    crypto_pools = CryptoPool[-1] # get the latest crypto pool
    account = get_account()

    poolAddr = crypto_pools.createPool(poolName, _open, address, {"from": account})
    return poolAddr

def list_pools():
    crypto_pools = CryptoPool[-1] # get the latest crypto pool
    (pools, poolAddrs) = crypto_pools.listPools()

    print(pools, poolAddrs) # PROD: delete this (or at least comment it out)
    return pools, poolAddrs

def destroy_pool(poolAddr):
    crypto_pools = CryptoPool[-1] # get the latest crypto pool
    account = get_account()

    crypto_pools.destroyPool(poolAddr, {"from": account})

