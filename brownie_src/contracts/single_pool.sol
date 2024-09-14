// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SinglePool {
    uint public tester; // for testing things; delete for prod
    // Initialise Variables
    string public name; // name of the pool
    bool public open; // true = public pool (anyone can join)

    struct Pooler {
        bool initialised;
        bool admin;     
        address addr;
        uint256 balance; // net money added to pool; positive = contributed, negative = withdrawn
    }

    Pooler[] public poolers;
    mapping(address => uint256) public poolerAddrToIndex;
    address public creator;

    address[] public joinQueue; // queue of people who want to join

    // Extra modifiers
    modifier onlyPoolers {
        uint256 poolerIndex = poolerAddrToIndex[msg.sender];
        require(poolerIndex > 0 || msg.sender == creator);
        _;
    }

    modifier onlyAdmins {
        uint256 poolerIndex = poolerAddrToIndex[msg.sender];
        require(poolerIndex > 0 || msg.sender == creator); // must be a pooler before they can be an admin
        require(poolers[poolerIndex].admin);
        _;
    }

    // Constructor
    constructor(string memory _name, bool _open, address _creator) {
        name = _name;
        open = _open;
        
        // TODO: Add options to specify admins
        _addPooler(_creator, true);
        creator = _creator; // Must come after _addPooler!
    }

    // Destructor
    function destroyPool() public onlyAdmins {
        // CUrrently, pool can only be closed if all balances are positive
        // Currently, only the creator can close a pool
        // TODO: Make this a vote.
        // All those with negative balances get to run free, money is returned to those with positive balance proportionately.
        require(msg.sender == creator);
        for (uint256 i = 0; i < poolers.length; i++) {
            require(poolers[i].balance >= 0);
        }

        for (uint256 i = 0; i < poolers.length; i++) {
            payable(poolers[i].addr).transfer(poolers[i].balance);
        }
        selfdestruct(payable(creator));
    }

    // Getters
    function getPool() public view returns (uint256) {
        return (address(this).balance);
    }

    function getPoolers() public view returns (address[] memory, bool[] memory, uint256[] memory) {
        // returns the addresses, admin status and balance of each pooler
        address[] memory poolerAddrs = new address[](poolers.length);
        bool[] memory admins = new bool[](poolers.length);
        uint256[] memory balances = new uint256[](poolers.length);
        for (uint256 i = 0; i < poolers.length; i++) {
            poolerAddrs[i] = poolers[i].addr;
            admins[i] = poolers[i].admin;
            balances[i] = poolers[i].balance;
        }
        
        return (poolerAddrs, admins, balances);
    }

    function getJoinQueue() public view returns (address[] memory) {
        // returns the adddress of each potential pooler
        return joinQueue;
    }

    // only the contract can call this function
    function _addPooler(address poolerAddr, bool admin) private {
        // make sure pooler has not been added before
        uint256 poolerIndex = poolerAddrToIndex[poolerAddr];
        if (poolerIndex != 0 ) { revert(); } // revert if pooler already added
        if (poolerAddr == creator) { revert(); } // if poolerIndex = 0, could be creator or new address

        Pooler memory pooler = Pooler({
            initialised: true,
            admin: admin,
            addr: poolerAddr,
            balance: 0
        });
        poolerAddrToIndex[poolerAddr] = poolers.length;
        poolers.push(pooler);
    }

    // only admins can call this function
    function addPooler(address poolerAddr, bool admin) public onlyAdmins {
        _addPooler(poolerAddr, admin);
    }

    function _removePooler(address poolerAddr) private {
        uint256 poolerIndex = poolerAddrToIndex[poolerAddr];
        require(poolerIndex != 0); // creators and non-poolers cannot be removed
        // TODO: Make it possible for the creator to be removed
        
        // remove from poolers
        if (poolerIndex < poolers.length - 1) { // needs this in case pooler is the last index
            for (uint256 i = poolerIndex; i < poolers.length - 1; i++) {
                poolers[i] = poolers[i+1];
            }
        }
        poolers.pop();

        // remove from pooler mapping
        poolerAddrToIndex[poolerAddr] = 0;
    }

    function removePooler(address poolerAddr) public onlyAdmins {
        _removePooler(poolerAddr);
    }

    function _getJoinQueueIndex(address poolerAddr) private view returns (uint256) {
        bool exists = false;
        uint256 joinQueueIndex = 0;
        for (uint256 i = 0; i < joinQueue.length; i++) {
            if (joinQueue[i] == poolerAddr) {
                joinQueueIndex = i;
                exists = true;
            }
        }

        if (!exists) { revert(); }

        return joinQueueIndex;
    }

    function _removeFromJoinQueue(uint256 joinQueueIndex) private {
        if (joinQueueIndex != joinQueue.length - 1) {
            for (uint256 i = joinQueueIndex; i < joinQueue.length - 1; i++) {
                joinQueue[i] = joinQueue[i+1];
            }
        }
        joinQueue.pop();
    }

    function acceptPooler(address poolerAddr) public onlyAdmins {
        // check if the pooler is in the join queue
        uint256 joinQueueIndex = _getJoinQueueIndex(poolerAddr);

        if (joinQueueIndex >= 0) {
            _addPooler(poolerAddr, false);
            _removeFromJoinQueue(joinQueueIndex);
        }
    }

    function makeAdmin(address poolerAddr) public onlyAdmins {
        uint256 poolerIndex = poolerAddrToIndex[poolerAddr];
        poolers[poolerIndex].admin = true;
    }

    function removeAdmin(address poolerAddr) public onlyAdmins {
        uint256 poolerIndex = poolerAddrToIndex[poolerAddr];
        poolers[poolerIndex].admin = false;
    }

    function join() public {
        // private: only admins can accept joins in the join queue
        // public: join automatically adds a pooler
        if (open) {
            _addPooler(address(msg.sender), false);
        } else {
            joinQueue.push(address(msg.sender));
        }

    }

    function cancelJoin() public {
        uint256 joinQueueIndex = _getJoinQueueIndex(address(msg.sender));

        if (joinQueueIndex >= 0) {
            _removeFromJoinQueue(joinQueueIndex);
        }
    }

    function leave() public {
        // anyone can leave but only admins can add poolers
        _removePooler(address(msg.sender));
    }

    // Only accepted poolers can deposit
    function deposit() public onlyPoolers payable {
        uint256 poolerIndex = poolerAddrToIndex[msg.sender];
        poolers[poolerIndex].balance += msg.value;
    }

    function withdraw(uint256 amount) public onlyPoolers payable {
        uint256 poolerIndex = poolerAddrToIndex[msg.sender];

        // Only withdraw as much money as there is in the pool
        require(amount <= address(this).balance);
        // Poolers in debt cannot withdraw money; must pay back debt first
        require(poolers[poolerIndex].balance >= 0);

        poolers[poolerIndex].balance -= amount;

        payable(msg.sender).transfer(amount);
    }

}