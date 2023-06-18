import Link from 'next/link';

export default function Navbar(props) {
    const { isConnected, connect } = props;

    return (
        <nav className="flex justify-center p-3">
            <div className="flex-1 flex justify-start items-center text-emerald">
                <Link href="/">
                    <a>
                        <img src="/images/emerald.png" className="max-w-16 max-h-16" /> {/* TODO: Fix this! */}
                    </a>
                </Link>
            </div>

            <div className="flex-1 flex justify-center items-center text-emerald">
                <Link href="/about">
                    <a className="p-3">About</a>
                </Link>

                <Link href="/help">
                    <a className="p-3">Help</a>
                </Link>

                <Link href="/pools">
                    <a className="p-3">Pools</a>
                </Link>
            </div>
            
            <div className="flex-1 flex justify-end pr-3 items-center">
            {isConnected ?
                <div className="flex justify-center items-center bg-emerald w-36 py-1 border-2 border-green-600 drop-shadow-xl transition duration-500">
                    <p className="text-white">Connected!</p>
                </div>
            :
                <div className="flex justify-center items-center bg-white w-36 py-1 border-2 border-emerald drop-shadow-xl">
                <button onClick={() => connect()} className="text-emerald">
                        Connect
                </button>
                </div>
            }
            </div>
        </nav>
    )
}