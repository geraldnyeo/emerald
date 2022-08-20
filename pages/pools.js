import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Pools(props) {
    const router = useRouter();
    const [pools, setPools] = useState([]);
    const [refresh, setRefresh] = useState(1);

    const { _web3api } = props;
    const { isConnected, execute, listPools } = _web3api;

    useEffect(() => {
        if (isConnected) {
            if (refresh) {
                getPools();
            }
        }
    })

    async function getPools() {
        if (isConnected) {
            const res = await execute(listPools);
            const poolArr = [];
            for (let i = 0; i < res["pools"].length; i++) {
                poolArr.push({
                    "name": res["pools"][i],
                    "address": res["poolAddrs"][i],
                });
            }
            setPools(poolArr);
            setRefresh(0);
        } else {
            alert("Please connect to Metamask!");
        }
    }

    const handlePoolClick = (poolAddr) => {
        router.push(`/pool/${poolAddr}`);
    }

    const handleCreate = () => {
        router.push(`/create`);
    }

    let poolList = pools.map((pool, index) => {
        return (
            <tr key={index}>
                <td>{index}</td>
                <td>{pool.name}</td>
                <td>{pool.address}</td>
                <td>
                    <button onClick={() => handlePoolClick(pool.address)}>
                        View
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <h1>Pools</h1>
            <button onClick={() => getPools()}>List Pools</button>
            <button onClick={() => handleCreate()}>Create</button>
            {isConnected ?
                <table className="table-auto w-screen text-left">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {poolList}
                    </tbody>
                </table>
            :
                <p>Please connect to Metamask!</p>
            }
        </div>
    )
}