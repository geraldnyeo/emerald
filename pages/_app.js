import '../styles/globals.css'

import { useState } from 'react';
import { ethers } from 'ethers';

import { get_crypto_pool, get_single_pool_abi } from "../src/scripts/_web3.js";

import Layout from "../src/components/layout.js";

function MyApp({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState();
  
  async function connect() { 
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        let connectedProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        setSigner(connectedProvider.getSigner());
      } catch(e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
      alert("Please install the Metamask extension!")
    }
  }

  // TODO: Revamp this function, AGAIN.
  // Oops I forgot what I was going to lol. If I remember I'll fix it I guess.
  async function execute(func, address=undefined, args=undefined) {
    if (typeof window.ethereum !== "undefined") {
      let abi;
      if (!address) {
        const res = await get_crypto_pool();
        address = res["address"];
        abi = res["abi"];
      } else {
        const res = await get_single_pool_abi();
        abi = res["abi"];
      }
      const contract = new ethers.Contract(address, abi, signer);

      try {
        if (args) {
          return await func(contract, args);
        } else {
          return await func(contract);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please connect to Metamask!");
    }
  }

  async function getUserAddress() {
    if (isConnected) {
      return await signer.getAddress()
    }
  }

  // cryptoPools functions
  async function createPool(contract, {name, open, address}={}) {
    await contract.createPool(name, open, address);
  }

  async function listPools(contract) {
    const [ pools, poolAddrs ] = await contract.listPools();
    return { pools, poolAddrs };
  }

  async function destroyPool(contract, {address}={}) {
    await contract.destroyPool(address);
  }

  // singlePool functions
  async function getPool(contract) {
    const name = await contract.name();
    const open = await contract.open();
    const balance = await contract.getPool();
    const creator = await contract.creator();
    const [ addresses, admins, balances ] = await contract.getPoolers();
    return { name, open, balance, creator, addresses, admins, balances };
 }

 async function getJoinQueue(contract) {
  const addresses = await contract.getJoinQueue();
  return addresses;
 }

  async function deposit(contract, {value}={}) {
    const options = {
      value: ethers.utils.parseUnits(String(value), "wei")
    }
    await contract.deposit(options);
  }

  async function withdraw(contract, {value}={}) {
    const amount = ethers.utils.parseUnits(String(value), "wei");
    await contract.withdraw(amount);
  }

  async function join(contract) {
    await contract.join();
  }

  async function cancelJoin(contract) {
    await contract.cancelJoin();
  }

  async function leave(contract) {
    await contract.leave();
  }

  async function removePooler(contract, {poolerAddr}={}) {
    await contract.removePooler(poolerAddr);
  }

  async function acceptPooler(contract, {poolerAddr}={}) {
    await contract.acceptPooler(poolerAddr);
  }

  async function makeAdmin(contract, {poolerAddr}={}) {
    await contract.makeAdmin(poolerAddr);
  }

  async function removeAdmin(contract, {poolerAddr}={}) {
    await contract.removeAdmin(poolerAddr);
  }

  const _web3api = {
    isConnected,
    connect,
    execute,
    getUserAddress,
    createPool,
    listPools,
    destroyPool,
    getPool,
    getJoinQueue,
    deposit,
    withdraw,
    join,
    cancelJoin,
    leave,
    removePooler,
    acceptPooler,
    makeAdmin,
    removeAdmin,
  }

  return (
      <Layout _web3api={_web3api}>
        <Component {...pageProps} _web3api={_web3api} />
      </Layout>
  )
}

export default MyApp;
