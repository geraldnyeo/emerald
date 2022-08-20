from brownie import accounts, config, network

LOCAL_ENVS = ["development", "ganache-local"]
FORKED_ENVS = ["mainnet-fork"]
EXT_ENVS = ["rinkeby"]

def get_account():
    if network.show_active() in LOCAL_ENVS or \
        network.show_active() in FORKED_ENVS:
        return accounts[0]
    elif network.show_active() in EXT_ENVS:
        return accounts.add(config["wallets"]["from_key"])
    else:
        print("Error: Attempted deploy to unknown network.")
        exit()