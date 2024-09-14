from brownie import SinglePool, CryptoPool
from scripts.api import (
    get_account,
)

def deploy_crypto_pool():
    account = get_account();

    crypto_pool = CryptoPool.deploy(
        {"from": account}
    )

    return crypto_pool

def main():
    deploy_crypto_pool()