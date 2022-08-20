from brownie import accounts, config, network, SinglePool, CryptoPool
from scripts.helpers import (
    get_account
)
from scripts.api import (
    create_pool,
    list_pools,
    destroy_pool
)

def deploy_crypto_pool():
    account = get_account()

    crypto_pool = CryptoPool.deploy(
        {"from": account},
    )
    print(f"Contract deployed to {crypto_pool.address}")
    return crypto_pool

def deploy_single_pool(poolName, _open):
    # do this to get the abi
    # just deploy to ganache (development)
    # actually, just use the one in contracts
    account = get_account()

    single_pool = SinglePool.deploy(
        poolName,
        _open,
        {"from": account},
    )
    print(f"Contract deployed to {single_pool.address}")
    return single_pool

def main():
    # crypto_pool = deploy_crypto_pool()
    # TODO: Every time crypto pool is deployed, store the address somewhere
    # addr = crypto_pool.address # address of the crypto_pool object
    # print(addr)

    # create_pool("Emerald pool", False, '0xeC64F4e649A8A87e8400B983B66191254B05BbB6')

    # list_pools()
    # destroy_pool('0x8030d0C8d0Facc8553523cf2217dE159790D2b77')
    # list_pools()
