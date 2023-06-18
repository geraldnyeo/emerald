import Head from 'next/head'

import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout(props) {
    const { _web3api, children } = props;
    const { isConnected, connect } = _web3api;

    return (
        <> 
            <Head>
                <title>Emerald</title>
                <meta name="description" content="A Web3 community financing platform" />
                <link rel="icon" href="/favicon.ico" />

                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Roboto:wght@100&display=swap" rel="stylesheet" />
            </Head>

            <Navbar isConnected={isConnected} connect={connect}/>

            <main className="p-10">{children}</main>

            <Footer />
        </>
    )
}