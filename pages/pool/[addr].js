import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Pool(props) {
    const router = useRouter();
    const { addr: poolAddr } = router.query;

    const { _web3api } = props;
    const { isConnected, getUserAddress, execute, destroyPool, getPool, getJoinQueue, deposit, withdraw, join, cancelJoin,
        leave, removePooler, acceptPooler, makeAdmin, removeAdmin, } = _web3api;
    
    const [depositUp, setDepositUp] = useState(false); // disable buttons when popup for deposit/withdraw
    const [withdrawUp, setWithdrawUp] = useState(false); // disable buttons when popup for deposit/withdraw
    const [address, setAddress] = useState(undefined);
    const [joining, setJoining] = useState(-1);
    const [joined, setJoined] = useState(-1);
    const [admin, setAdmin] = useState(false);
    const [data, setData] = useState({
        "name": "",
        "open": true,
        "balance": 0,
        "creator": "",
        "members": [],
        "joinQueue": [],
    })
    const [amount, setAmount] = useState(0);

    let refresh = 0; // TODO: Implement a refresh to refresh whenever a change is made.
    useEffect(() => {
        getPoolData();
        getJoinStatus();
    })

    async function getPoolData() {
        const { name, open, balance, creator, addresses, admins, balances } = await execute(getPool, poolAddr);
        let _data = {
            "name": String(name),
            "open": open,
            "balance": parseInt(balance),
            "creator": String(creator),
        };
        
        // check consistency of data
        if (!addresses.length == admins.length || !addresses.length == balances.length) {
            alert("Error occured on the backend: please notify developers.");
        }

        let member;
        const members = [];
        for (let i = 0; i < addresses.length; i++) {
            member = {
                "address": String(addresses[i]),
                "admin": admins[i],
                "balance": parseInt(balances[i])
            }
            members.push(member);
        }

        _data["members"] = members;

        const joinQueueAddresses = await execute(getJoinQueue, poolAddr);
        _data["joinQueue"] = joinQueueAddresses;
        setData(_data);
    }

    async function getJoinStatus() {
        const addr = await getUserAddress();
        setAddress(addr);

        // Check if user has joined
        for (let i = 0; i < data.members.length; i++) {
            if (address == data.members[i].address) {
                setJoined(i);
                if (data.members[i].admin) {
                    setAdmin(true);
                }
            }
        }

        // Check if user is in the join queue
        for (let i = 0; i < data.joinQueue.length; i++) {
            if (address == data.joinQueue[i]) {
                setJoining(i);
            }
        }
    }

    // may want to merge state management for deposit and withdraw
    async function toggleDeposit() {
        setDepositUp(!depositUp);
        if (!depositUp) {
            setAmount(0);
        }
    }

    async function toggleWithdraw() {
        setWithdrawUp(!withdrawUp);
        if (!withdrawUp) {
            setAmount(0);
        }
    }

    async function handleAmount(event) {
        if (!event.target.value) {
            setAmount(0);
        } else {
            setAmount(parseInt(event.target.value));
        }
    }

    async function handleJoin() {
        await execute(join, poolAddr);
    }

    async function handleCancelJoin() {
        await execute(cancelJoin, poolAddr);
    }

    async function handleLeave() {
        await execute(leave, poolAddr);
    }

    async function handleDeposit() {
        const args = {
            value: amount,
        }
        await execute(deposit, poolAddr, args);
        toggleDeposit();
    }

    async function handleWithdraw() {
         const args = {
            value: amount,
        }
        await execute(withdraw, poolAddr, args);
        toggleWithdraw();
    }

    async function handleDestroy() {
        const args = {
            address: poolAddr
        }
        await execute(destroyPool, undefined, args);
        router.push("/pools");
    }

    async function handleKick(poolerAddr) {
        const args = {
            poolerAddr: poolerAddr
        }
        await execute(removePooler, poolAddr, args);
    }

    async function handleAccept(poolerAddr) {
        const args = {
            poolerAddr: poolerAddr
        }
        await execute(acceptPooler, poolAddr, args);
    }

    async function handleMakeAdmin(poolerAddr) {
        const args = {
            poolerAddr: poolerAddr
        }
        await execute(makeAdmin, poolAddr, args);
    }

    async function handleRemoveAdmin(poolerAddr) {
        const args = {
            poolerAddr: poolerAddr
        }
        await execute(removeAdmin, poolAddr, args);
    }

    let memberList = data.members.map((member, index) => {
        return (
            <tr key={index}>
                <td className="p-1">{index}</td>
                <td className="p-1">{member.address}</td>
                <td className="p-1">{member.balance}</td>
                <td className="p-1">
                    <button onClick={member.admin ? () => handleRemoveAdmin(member.address) : () => handleMakeAdmin(member.address)}>
                        {member.admin ? "Admin" : "Member"}
                    </button>
                </td>
                {(admin) ? 
                    <td className="p-1"><button onClick={() => handleKick(member.address)}>Kick</button></td>
                : <></>}
            </tr>
        )
    })

    let joinList = data.joinQueue.map((joiner, index) => {
        return (
            <tr key={index}>
                <td className="p-1"></td>
                <td className="p-1 text-red-500">{joiner}</td>
                <td className="p-1">N.A.</td>
                <td className="p-1">Joining...</td>
                {(admin) ?
                    <td className="p-1"><button onClick={() => handleAccept(joiner)}>Accept</button></td>
                : <></> }
            </tr>
        )
    })

    const depositBox = () => { 
        return (
            <div className="p-10 border border-gray-700 bg-white z-1 fixed m-auto inset-x-0 inset-y-0 w-fit h-fit">
                <h3 className="font-bold text-xl mb-3">Deposit</h3>
                <form onSubmit={(event) => event.preventDefault()}> {/* TODO: DEBUG. Not sure why this is not working. */}
                    <label>Amount to deposit (ETH - in WEI):</label>
                    <input type="text" value={amount} onChange={handleAmount} className="px-2"></input>
                    <button type="submit" onClick={handleDeposit}>Deposit</button>
                </form>
                <button onClick={toggleDeposit}>Cancel</button>
            </div>
        )
    }

    const withdrawBox = () => { 
        return (
            <div className="p-10 border border-gray-700 bg-white z-1 fixed m-auto inset-x-0 inset-y-0 w-fit h-fit">
                <h3 className="font-bold text-xl mb-3">Withdraw</h3>
                <form onSubmit={(event) => event.preventDefault()}> {/* TODO: DEBUG. Not sure why this is not working. */}
                    <label>Amount to withdraw (ETH - in WEI)</label>
                    <input type="text" value={amount} onChange={handleAmount}></input>
                    <button type="submit" onClick={handleWithdraw}>Withdraw</button>
                </form>
                <button onClick={toggleWithdraw}>Cancel</button>
            </div>
        )
    }

    const renderJoinBtn = () => {
        if (joined !== -1) {
            return (
                <>
                    <button onClick={handleLeave} className="px-2 py-1 text-emerald">Leave</button>
                </>
            )
        } else if (joining !== -1) {
            return (
                <>
                    <button onClick={handleCancelJoin} className="px-2 py-1 text-emerald">Cancel Join</button>
                </>
            )
        } else {
            return (
                <>
                    <button onClick={handleJoin} className="px-2 py-1 text-emerald">Join</button>
                </>
            )
        }
    }

    return (
       <div>
            {isConnected ?
                <div>
                    <h2 className="text-4xl mb-2">{data.name}</h2>
                    <p>{poolAddr}</p>

                    <br></br>

                    {/* Main Stats */}
                    <div className="flex">
                        <div className="flex-1 shadow-md p-3 border border-gray-700 m-3">
                            <h3 className="text-lg font-bold">Balance</h3>
                            <p>Pool total: {data.balance}</p>
                        </div>

                        <div className="flex-1 shadow-md p-3 border border-gray-700 m-3">
                            <h3 className="text-lg font-bold">Members</h3>
                            <p>{data.members.length}</p>
                        </div>
                    </div>

                    <br></br>

                    {(joined !== -1) ?
                        <>
                            <div className="flex shadow-md p-3 border border-gray-700 m-3">
                                <div className="flex-grow">
                                    <p className="font-bold text-lg">Your total: {data.members[joined].balance}</p>
                                </div>
                                <button onClick={toggleDeposit} className="mx-3 text-emerald">Deposit</button>
                                <button onClick={toggleWithdraw} className="mx-3 text-emerald">Withdraw</button>
                            </div>
                        </>
                    : <></> }

                    <br></br>
                    <br></br>

                    {/* Members */}
                    <h3 className="text-xl font-bold">Members</h3>
                    <hr className="m-1"></hr>
                    <table className="table-auto w-full text-left border-spacing-2">
                        <thead>
                        <tr>
                            <th className="p-1"></th>
                            <th className="p-1">Address</th>
                            <th className="p-1">Balance</th>
                            <th className="p-1">Status</th>
                            {(admin) ? 
                                <th className="p-1">Edit</th>
                            : <></>}
                        </tr>
                        </thead>
                        <tbody>
                            {memberList}
                            {joinList}
                        </tbody>
                    </table>

                    <br></br>

                    {/* Settings */}
                    <h3 className="text-lg font-bold mb-1">Settings</h3>
                    {renderJoinBtn()}
                    <div>
                        <p className="px-2 py-1">Open: {data.open ? "Yes" : "No"}</p>

                        <button onClick={handleDestroy} className="px-2 py-1 text-red-500">Destroy Pool</button>
                    </div>

                    {/*Popups for deposit and withdraw*/}
                    {depositUp ? <> {depositBox()} </> : <></> }
                    {withdrawUp ? <> {withdrawBox()} </> : <></> }
                </div>
            :
                <p>Please connect to Metamask!</p>
            }
        </div>
    )
}