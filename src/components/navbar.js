import Link from 'next/link';

export default function Navbar(props) {
    const { isConnected, connect } = props;

    return (
        <nav className="flex justify-center p-5">
            <div className="flex-1">
                <Link href="/">
                    <a>Navbar</a>
                </Link>
            </div>

            <div className="flex-1">
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
            
            <div className="flex-1 flex justify-end pr-3">
            {isConnected ?
                <p className="text-emerald">Connected!</p>
            :
                <button onClick={() => connect()} className="text-emerald">
                        Connect to Metamask
                </button>
            }
            </div>
        </nav>
    )
}