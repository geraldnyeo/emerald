// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./single_pool.sol";

contract CryptoPool {
    // Initialise variables
    SinglePool[] public cryptoPools;
    mapping(address => uint256) public poolAddressToIndex;

    // create a pool
    function createPool(string memory poolName, bool open, address creator) public returns (address) {
        SinglePool pool = new SinglePool(poolName, open, creator);
        poolAddressToIndex[address(pool)] = cryptoPools.length;
        cryptoPools.push(pool);

        return address(pool);
    }

    // list the available pools
    function listPools() public view returns (string[] memory, address[] memory) {
        string[] memory pools = new string[](cryptoPools.length);
        address[] memory poolAddrs = new address[](cryptoPools.length);
        string memory poolName;
        address poolAddr;
        for (uint256 i = 0; i < cryptoPools.length; i++) {
            poolName = cryptoPools[i].name();
            pools[i] = poolName;
            
            poolAddr = address(cryptoPools[i]);
            poolAddrs[i] = poolAddr;
        }
        
        return (pools, poolAddrs);
    }

    // destroy a pool
    function destroyPool(address poolAddress) public {
        uint256 pool_index = poolAddressToIndex[poolAddress];

        // Check if sender is the creator
        SinglePool pool = cryptoPools[pool_index];
        require(msg.sender == pool.creator());

        // remove item at pool_index
        if (pool_index < cryptoPools.length - 1) {
            for (uint256 i = pool_index; i < cryptoPools.length - 1; i++) {
                cryptoPools[i] = cryptoPools[i+1];
            } 
        }
        cryptoPools.pop();
    }

}
