import { useState } from 'react';
import { useRouter } from "next/router";

export default function Create(props) {
    const router = useRouter();
    const [ settings, setSettings ] = useState({
        "name": "",
        "open": false,
    })

    const { _web3api } = props;
    const { execute, getUserAddress, createPool } = _web3api;

    async function handleNameChange(event) {
        setSettings({
            ...settings,
            "name": event.target.value
        })
    }

    async function handleOpenChange(event) {
        setSettings({
            ...settings,
            "open": event.target.checked
        })
    }

    async function handleCreate() {
        const address = await getUserAddress();
        const args = {
            "name": settings.name,
            "open": settings.open,
            "address": address
        }
        await execute(createPool, undefined, args)
        router.push("/pools");
    }

    return (
        <div>
            <h1>Create your pool</h1>

            <form>
                <input type="text" value={settings.name} placeholder="Name" onChange={handleNameChange}></input>
                <label>Open</label>
                <input type="checkbox" checked={settings.open} onChange={handleOpenChange}></input>
            </form>
 
            <button onClick={() => handleCreate()}>Create</button>
        </div>
    )
}